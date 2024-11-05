import { Maybe } from '@/types';

export type AcceptType = 'all' | 'media' | 'image' | 'file' | 'video';

export type UploadStatus = 'ready' | 'progress' | 'success' | 'fail';

export type UploadType = 'image' | 'video' | 'file';

export type UploadItem = {
  id: string;
  url: string;
  thumb?: string;
  type: UploadType;
  status: UploadStatus;
  percent?: number;
  hash?: string;
};

export type Compress =
  | false
  | {
      width?: number;
      height?: number;
      quality?: number;
    };

export interface UploadFile extends File {
  id: string;
  base64?: Maybe<string | ArrayBuffer>;
  onProgress?: (file: UploadFile, percent: number) => void;
  [key: string]: any;
}

export interface UploadResult {
  status: UploadStatus;
  url: string;
}
