<template>
  <div class="weui-uploader">
    <div class="weui-uploader__bd">
      <ul v-if="showFileList" class="weui-uploader__files" id="uploaderFiles">
        <template v-if="$slots.item">
          <slot
            v-for="item in fileList"
            :key="item.id"
            name="item"
            :item="item"
          />
        </template>
        <template v-else>
          <li
            v-for="item in fileList"
            :key="item.id"
            :class="[
              'weui-uploader__file',
              { 'weui-uploader__file_status': item.status !== 'success' }
            ]"
            :data-id="item.id"
            role="img"
            :style="{ backgroundImage: `url(${item.thumb || item.url})` }"
          >
            <div
              v-if="item.status !== 'success'"
              class="weui-uploader__file-content"
            >
              <i v-if="item.status === 'fail'" class="weui-icon-warn"></i>
              <template v-else-if="item.status === 'progress' && item.percent">
                {{ item.percent }}%
              </template>
              <i
                v-else
                class="weui-loading"
                style="width: 30px; height: 30px"
              ></i>
            </div>
            <div class="delete-upload-btn" @click="deleteUploadFile(item)">
              <i class="weui-icon-close close-icon" />
            </div>
          </li>
        </template>
      </ul>
      <div class="weui-uploader__input-wrapper">
        <template v-if="$slots.uploadBtn">
          <slot name="uploadBtn" />
        </template>
        <div v-else class="weui-uploader__input-box"></div>
        <input
          id="uploaderInput"
          class="weui-uploader__input"
          type="file"
          :accept="acceptType"
          :capture="true"
          :multiple="multiple"
          @change="handleInputChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useAccpect } from './hooks';
import isObject from 'lodash/isObject';
import { shortid } from '../utils';
import upload from './upload';
import compressFile from './compress';
import fileHash from './filehash';
import { getFileType } from './tools';
import {
  AcceptType,
  UploadFile,
  UploadResult,
  Compress,
  UploadItem
} from './types';
import { Maybe, PlainObject } from '../types';
import './uploader.less';

defineOptions({
  name: 'weui-uploader'
});
const props = withDefaults(
  defineProps<{
    modelValue?: UploadItem[];
    action?: string;
    type?: 'file' | 'base64';
    name?: string;
    accept?: AcceptType;
    multiple?: boolean;
    disabled?: boolean;
    maxCount?: number;
    maxSize?: number;
    compress?: Compress;
    showFileList?: boolean;
    repeatUpload?: boolean;
    beforeUpload?: (file: File, files: File[]) => Maybe<boolean>;
    beforeSend?: (
      file: UploadFile
    ) => Maybe<{ data?: PlainObject; headers?: PlainObject }>;
    customSend?: (file: UploadFile) => Promise<UploadResult>;
    convertResult?: (result: PlainObject) => UploadResult;
  }>(),
  {
    modelValue: () => ref([]).value,
    type: 'file',
    name: 'file',
    multiple: false,
    disabled: false,
    showFileList: true,
    repeatUpload: true,
    compress: () => ({
      width: 1600,
      height: 1600,
      quality: 0.8
    })
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', value: UploadItem[]): void;
  (type: 'success', file: UploadFile, result: PlainObject): void;
  (type: 'error', file: UploadFile, error: Error): void;
  (type: 'progress', file: UploadFile, percent: number): void;
  (type: 'delete', file: UploadItem): void;
}>();
const { accept, action, name, type, compress, maxSize, maxCount } =
  toRefs(props);
const acceptType = useAccpect(accept);
const fileList = useVModel(props, 'modelValue', emit);
const uploadHash = new Set<string>();
const hashPromises = new Set<Promise<any>>();

const getUploadFileItem = (id: string) =>
  fileList.value.find((item) => item.id === id);

const hashExists = async (hash: string) => {
  if (hashPromises.size > 0) {
    return Promise.allSettled(Array.from(hashPromises)).then(() =>
      uploadHash.has(hash)
    );
  }
  return uploadHash.has(hash);
};

const uploadFileHandler = (file: UploadFile) => {
  if (!props.customSend) {
    upload({
      url: action?.value || '/',
      file,
      fileVal: name.value,
      type: type.value,
      xhrFields: {},
      beforeSend: beforeSend,
      onProgress: progressHandler,
      onSuccess: successHandler,
      onError: errorHandler
    });
  } else {
    file.onProgress = progressHandler;
    const result = props.customSend.call(file, file);
    result.then((result) => {
      if (!isObject(result)) {
        const error = new Error(
          'Illegal operation, custom upload logic returns Promise and needs to provide upload information.'
        );
        errorHandler(file, error);
        throw error;
      }
      const { status, url } = result;
      file.status = status;
      file.url = url;
      successHandler(file, result);
    });
  }
};

const beforeSend = (
  file: UploadFile,
  data: PlainObject,
  headers: PlainObject
) => {
  if (props.beforeSend) {
    const result = props.beforeSend.call(file, file);
    if (isObject(result)) {
      result.data && Object.assign(data, result.data);
      result.headers && Object.assign(headers, result.headers);
    }
  }
};

const beforeQueue = async (file: File, files: FileList) => {
  let arrayFiles = Array.from(files);
  // 文件过大，直接丢弃
  if (maxSize?.value && file.size >= maxSize.value) {
    return false;
  }
  // 上传数量超出，直接丢弃
  if (maxCount?.value && maxCount.value <= fileList.value.length) {
    return false;
  }
  if (!props.repeatUpload) {
    // 关闭重复上传情况下，直接拦截掉
    try {
      /**
       * 这里hash计算是异步的，当文件过大时，可能出现计算hash时间很久的情况
       * 此时如果在hash计算完成前，用户再次点击相同的文件上传，因为在 uploadHash 中还没存在计算好的hash值，会导致相同文件被多次上传
       *
       * 所以在判断是否存在对应的文件的hash时，先检查是否还有在计算中的Promise，如果有，则等待计算中的Promise完成后再判断是否存在hash值
       */
      const hashPromise = fileHash(file);
      hashPromises.add(hashPromise);
      const hash = await hashPromise;
      hashPromises.delete(hashPromise);
      if (await hashExists(hash)) {
        return false;
      }
      uploadHash.add(hash);
      (file as any).hash = hash;
    } catch (err) {
      return false;
    }
  }
  if (props.beforeUpload) {
    const result = props.beforeUpload.apply(file, [file, arrayFiles]);
    if (result === false) {
      return false;
    }
  }
};

const successHandler = (file: UploadFile, result: PlainObject) => {
  const fileId = file.id;
  const uploadItem = getUploadFileItem(fileId);
  const plainResult = props.convertResult
    ? props.convertResult(result)
    : result;
  if (uploadItem) {
    const { url, status } = plainResult || {};
    uploadItem.status = status || 'success';
    uploadItem.percent = 100;
    uploadItem.url = url;
  }
  emit('success', file, result);
};

const errorHandler = (file: UploadFile, error: Error) => {
  const fileId = file.id;
  const uploadItem = getUploadFileItem(fileId);
  if (uploadItem) {
    uploadItem.status = 'fail';
  }
  emit('error', file, error);
};

const progressHandler = (file: UploadFile, percent: number) => {
  const fileId = file.id;
  const uploadItem = getUploadFileItem(fileId);
  if (uploadItem) {
    uploadItem.status = 'progress';
    uploadItem.percent = percent;
  }
  emit('progress', file, percent);
};

const handleInputChange = (evt: Event) => {
  const files = (evt.target as HTMLInputElement).files;
  if (!files || files?.length === 0) {
    return;
  }

  Array.prototype.forEach.call(files, (file) => {
    beforeQueue(file, files).then((res) => {
      if (res === false) return;

      const fileId = shortid(9);
      const uploadItem: UploadItem = {
        id: fileId,
        status: 'ready',
        url: '',
        thumb: URL.createObjectURL(file),
        type: getFileType(file),
        hash: file.hash
      };
      file.id = fileId;
      fileList.value.push(uploadItem);

      if (
        (compress.value === false && type.value == 'file') ||
        accept?.value !== 'image'
      ) {
        uploadFileHandler(file);
      } else {
        compressFile(
          file,
          {
            compress: compress.value,
            type: type.value,
            onError: errorHandler
          },
          (file: Maybe<UploadFile>) => {
            if (file) uploadFileHandler(file);
          }
        );
      }
    });
  });
};

const deleteUploadFile = (file: UploadItem) => {
  const fileIndex = fileList.value.findIndex((item) => item.id === file.id);
  if (fileIndex > -1) {
    fileList.value.splice(fileIndex, 1);
  }
  file.hash && uploadHash.delete(file.hash);
  emit('delete', file);
};
</script>
