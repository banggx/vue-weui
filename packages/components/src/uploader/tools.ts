import { UploadType } from './types';

export function getFileType(file: File): UploadType {
  if (!file) {
    return 'file';
  }

  const type = file.type;
  if (!type) {
    return 'file';
  }

  if (type.startsWith('image/')) {
    return 'image';
  } else if (type.startsWith('video/')) {
    return 'video';
  } else {
    return 'file';
  }
}
