import { Maybe } from '@/types';
import { UploadFile, Compress } from './types';

/**
 * 检查图片是否有被压扁，如果有，返回比率
 * ref to http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 */
function detectVerticalSquash(img: HTMLImageElement) {
  // 拍照在IOS7或以下的机型会出现照片被压扁的bug
  let data;
  const ih = img.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = ih;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0);
  try {
    data = ctx?.getImageData(0, 0, 1, ih).data;
  } catch (err) {
    console.log('Cannot check verticalSquash: CORS?');
    return 1;
  }
  let sy = 0;
  let ey = ih;
  let py = ih;
  while (py > sy) {
    const alpha = data?.[(py - 1) * 4 + 3];
    if (alpha === 0) {
      ey = py;
    } else {
      sy = py;
    }
    py = (ey + sy) >> 1; // py = parseInt((ey + sy) / 2)
  }
  const ratio = py / ih;
  return ratio === 0 ? 1 : ratio;
}

/**
 * dataURI to blob, ref to https://gist.github.com/fupslot/5015897
 * @param dataURI
 */
function dataURItoBuffer(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const buffer = new ArrayBuffer(byteString.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < byteString.length; i++) {
    view[i] = byteString.charCodeAt(i);
  }
  return buffer;
}
function dataURItoBlob(dataURI: string) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const buffer = dataURItoBuffer(dataURI);
  return new Blob([buffer], { type: mimeString });
}

/**
 * 获取图片的orientation
 * ref to http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
 */
function getOrientation(buffer: ArrayBuffer) {
  const view = new DataView(buffer);
  if (view.getUint16(0, false) != 0xffd8) return -2;
  const length = view.byteLength;
  let offset = 2;
  while (offset < length) {
    const marker = view.getUint16(offset, false);
    offset += 2;
    if (marker == 0xffe1) {
      if (view.getUint32((offset += 2), false) != 0x45786966) return -1;
      const little = view.getUint16((offset += 6), false) == 0x4949;
      offset += view.getUint32(offset + 4, little);
      const tags = view.getUint16(offset, little);
      offset += 2;
      for (let i = 0; i < tags; i++)
        if (view.getUint16(offset + i * 12, little) == 0x0112)
          return view.getUint16(offset + i * 12 + 8, little);
    } else if ((marker & 0xff00) != 0xff00) break;
    else offset += view.getUint16(offset, false);
  }
  return -1;
}

/**
 * 修正拍照时图片的方向
 * ref to http://stackoverflow.com/questions/19463126/how-to-draw-photo-with-correct-orientation-in-canvas-after-capture-photo-by-usin
 */
function orientationHelper(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  orientation: number
) {
  const w = canvas.width,
    h = canvas.height;
  if (orientation > 4) {
    canvas.width = h;
    canvas.height = w;
  }
  switch (orientation) {
    case 2:
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      break;
    case 3:
      ctx.translate(w, h);
      ctx.rotate(Math.PI);
      break;
    case 4:
      ctx.translate(0, h);
      ctx.scale(1, -1);
      break;
    case 5:
      ctx.rotate(0.5 * Math.PI);
      ctx.scale(1, -1);
      break;
    case 6:
      ctx.rotate(0.5 * Math.PI);
      ctx.translate(0, -h);
      break;
    case 7:
      ctx.rotate(0.5 * Math.PI);
      ctx.translate(w, -h);
      ctx.scale(-1, 1);
      break;
    case 8:
      ctx.rotate(-0.5 * Math.PI);
      ctx.translate(-w, 0);
      break;
  }
}

interface CompressOptions {
  compress: Compress;
  type: 'file' | 'base64';
  onError: (file: UploadFile, e: Error) => void;
}

/**
 * 压缩图片
 */
function compress(
  file: UploadFile,
  options: CompressOptions,
  callback: (file: Maybe<UploadFile>) => void
) {
  const reader = new FileReader();
  reader.onload = function (evt) {
    if (options.compress === false) {
      // 不启用压缩 & base64上传 的分支，不做任何处理，直接返回文件的base64编码
      file.base64 = evt.target?.result;
      callback(file);
      return;
    }

    // 启用压缩的分支
    const img = new Image();
    img.onload = function () {
      const ratio = detectVerticalSquash(img);
      const orientation = getOrientation(dataURItoBuffer(img.src));
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const maxW =
        (options.compress as Exclude<Compress, boolean>).width || 1600;
      const maxH =
        (options.compress as Exclude<Compress, boolean>).height || 1600;
      let w = img.width;
      let h = img.height;
      let dataURL;

      if (w < h && h > maxH) {
        w = parseInt(((maxH * img.width) / img.height) as any);
        h = maxH || 1600;
      } else if (w >= h && w > maxW) {
        h = parseInt(((maxW * img.height) / img.width) as any);
        w = maxW || 1600;
      }

      canvas.width = w;
      canvas.height = h;

      if (orientation > 0) {
        orientationHelper(canvas, ctx!, orientation);
      }
      ctx?.drawImage(img, 0, 0, w, h / ratio);

      if (/image\/jpeg/.test(file.type) || /image\/jpg/.test(file.type)) {
        dataURL = canvas.toDataURL(
          'image/jpeg',
          (options.compress as Exclude<Compress, boolean>).quality
        );
      } else {
        dataURL = canvas.toDataURL(file.type);
      }

      if (options.type == 'file') {
        if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
          // 压缩出错，以文件方式上传的，采用原文件上传
          console.warn(
            'Compress fail, dataURL is ' +
              dataURL +
              '. Next will use origin file to upload.'
          );
          callback(file);
        } else {
          const blob = dataURItoBlob(dataURL) as any;
          blob.id = file.id;
          blob.name = file.name;
          blob.lastModified = file.lastModified;
          blob.lastModifiedDate = file.lastModifiedDate;
          callback(blob);
        }
      } else {
        if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
          // 压缩失败，以base64上传的，直接报错不上传
          options.onError(
            file,
            new Error('Compress fail, dataURL is ' + dataURL + '.')
          );
          callback(undefined);
        } else {
          file.base64 = dataURL;
          callback(file);
        }
      }
    };
    img.src = evt.target?.result as string;
  };
  reader.readAsDataURL(file);
}

export default compress;
