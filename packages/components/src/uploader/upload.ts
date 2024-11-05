import { PlainObject } from '@/types';
import { UploadFile } from './types';

interface UploadOptions {
  url: string;
  file: UploadFile;
  fileVal: string;
  type: 'file' | 'base64';
  xhrFields: PlainObject;
  beforeSend?: (
    file: UploadFile,
    data: PlainObject,
    headers: PlainObject
  ) => void;
  onProgress?: (file: UploadFile, percent: number) => void;
  onSuccess?: (file: UploadFile, response: any) => void;
  onError?: (file: UploadFile, error: Error) => void;
}

export default function upload(options: UploadOptions) {
  const {
    url,
    file,
    fileVal,
    beforeSend,
    onProgress,
    onError,
    onSuccess,
    xhrFields
  } = options;
  const { name, type, lastModifiedDate } = file;
  const data: PlainObject = {
    name: name,
    type: type,
    size: options.type == 'file' ? file.size : (file.base64 as any)?.length,
    lastModifiedDate: lastModifiedDate
  };
  const headers: PlainObject = {};

  beforeSend && beforeSend(file, data, headers);

  onProgress && onProgress(file, 0);

  const formData = new FormData();
  const xhr = new XMLHttpRequest();

  file.xhr = xhr;

  // 设置参数
  Object.keys(data).forEach((key: string) => {
    formData.append(key, data[key]);
  });
  if (options.type == 'file') {
    formData.append(fileVal, file, name);
  } else {
    formData.append(fileVal, file.base64 as string);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        try {
          // 只支持json
          const ret = JSON.parse(xhr.responseText);
          onSuccess && onSuccess(file, ret);
        } catch (err: any) {
          onError && onError(file, err);
        }
      } else {
        onError &&
          onError(
            file,
            new Error('XMLHttpRequest response status is ' + xhr.status)
          );
      }
    }
  };
  xhr.upload.addEventListener(
    'progress',
    function (evt) {
      if (evt.total == 0) return;

      const percent = Math.ceil(evt.loaded / evt.total) * 100;

      onProgress && onProgress(file, percent);
    },
    false
  );

  xhr.open('POST', url);

  Object.keys(xhrFields).forEach((key) => {
    (xhr as any)[key] = xhrFields[key];
  });
  // 设置头部信息
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });

  xhr.send(formData);
}
