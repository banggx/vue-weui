import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import userEvent from '@testing-library/user-event';
import Uploader from '../uploader.vue';

const delay = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const base64ToBlob = (base64Data: string, contentType: string) => {
  contentType = contentType || '';
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: contentType });
  return blob;
};

describe('weui-uploader', () => {
  it('render uploader', () => {
    const wrapper = mount(Uploader, {
      props: {
        modelValue: [
          {
            id: '1',
            url: '',
            thumb: 'test',
            status: 'progress',
            percent: 50,
            type: 'file'
          },
          {
            id: '2',
            url: '',
            thumb: 'test',
            status: 'success',
            type: 'file'
          },
          {
            id: '3',
            url: '',
            thumb: 'test',
            status: 'fail',
            type: 'file'
          },
          {
            id: '4',
            url: '',
            thumb: 'test',
            status: 'ready',
            type: 'file'
          }
        ],
        type: 'file',
        action: '',
        name: 'file',
        accept: 'image'
      }
    });

    const uploadFiles = wrapper.find('#uploaderFiles');
    // progress upload file render
    const progressItem = uploadFiles.find('.weui-uploader__file[data-id="1"]');
    expect(progressItem.classes()).includes('weui-uploader__file_status');
    expect(progressItem.find('.weui-uploader__file-content').text()).toBe(
      '50%'
    );

    // success upload file render
    const successItem = uploadFiles.find('.weui-uploader__file[data-id="2"]');
    expect(successItem.classes()).not.includes('weui-uploader__file_status');
    expect(successItem.find('.weui-uploader__file-content').exists()).toBe(
      false
    );

    // fail upload file render
    const failItem = uploadFiles.find('.weui-uploader__file[data-id="3"]');
    expect(failItem.classes()).includes('weui-uploader__file_status');
    expect(
      failItem.find('.weui-uploader__file-content .weui-icon-warn').exists()
    ).toBe(true);

    // ready upload file render
    const readyItem = uploadFiles.find('.weui-uploader__file[data-id="4"]');
    expect(readyItem.classes()).includes('weui-uploader__file_status');
    expect(
      readyItem.find('.weui-uploader__file-content .weui-loading').exists()
    ).toBe(true);
  });

  it('render custom slots', () => {
    const wrapper = mount(Uploader, {
      props: {
        modelValue: [
          {
            id: '1',
            url: '',
            thumb: 'test',
            status: 'success',
            type: 'file'
          }
        ]
      },
      slots: {
        item: ({ item }) => item.status,
        uploadBtn: () => 'uploadBtn'
      }
    });

    const itemRender = wrapper.find('.weui-uploader__files');
    expect(itemRender.text()).toBe('success');

    const uploadBtnRender = wrapper.find('.weui-uploader__input-wrapper');
    expect(uploadBtnRender.text()).toBe('uploadBtn');
  });

  it('upload file', async () => {
    const beforeQueue = vi.fn();
    const beforeSend = vi.fn(() => ({
      data: {
        test: 'test'
      },
      headers: {
        test: 'test'
      }
    }));
    const onProgress = vi.fn();
    const onError = vi.fn();
    const wrapper = mount(Uploader, {
      props: {
        accept: 'image',
        action: 'test',
        compress: false,
        beforeUpload: beforeQueue,
        beforeSend: beforeSend,
        onProgress: onProgress,
        onError: onError
      }
    });

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const uploadInput = wrapper.find('#uploaderInput');
    await userEvent.upload(uploadInput.element as HTMLElement, file);
    await delay(500);
    expect(beforeQueue).toHaveBeenCalled();
    expect(beforeSend).toHaveBeenCalled();
    expect(onProgress).toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });

  it('custom upload file', async () => {
    const customUpload = vi.fn(async () => {
      return {
        status: 'success',
        url: 'test'
      } as any;
    });
    const convertResult = vi.fn((data) => data);
    const wrapper = mount(Uploader, {
      props: {
        accept: 'image',
        action: 'test',
        compress: false,
        customSend: customUpload,
        convertResult: convertResult
      }
    });

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const uploadInput = wrapper.find('#uploaderInput');
    await userEvent.upload(uploadInput.element as HTMLElement, file);
    expect(customUpload).toHaveBeenCalled();
    expect(convertResult).toHaveBeenCalled();
    expect(wrapper.emitted()).toHaveProperty('success');
  });

  it('custom abnormal upload file', async () => {
    const customUpload = vi.fn(async () => null);
    const onError = vi.fn();
    const wrapper = mount(Uploader, {
      props: {
        accept: 'image',
        action: 'test',
        compress: false,
        customSend: customUpload as any,
        onError: onError
      }
    });

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const uploadInput = wrapper.find('#uploaderInput');
    await userEvent.upload(uploadInput.element as HTMLElement, file);
    expect(customUpload).toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });

  it('upload compress file', async () => {
    const customUpload = vi.fn(async () => {
      return {
        status: 'success',
        url: 'test'
      } as any;
    });
    const wrapper = mount(Uploader, {
      props: {
        accept: 'image',
        action: 'test',
        customSend: customUpload
      }
    });

    const base64String =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
    const blob = base64ToBlob(base64String.split(',')[1], 'image/png');
    const file = new File([blob], 'hello.png', { type: 'image/png' });
    const uploadInput = wrapper.find('#uploaderInput');
    await userEvent.upload(uploadInput.element as HTMLElement, file);
    // expect(customUpload).toHaveBeenCalled();
    // expect(convertResult).toHaveBeenCalled();
    // expect(wrapper.emitted()).toHaveProperty('success');
  });

  // it('upload repeat file', async () => {
  //   const customUpload = vi.fn(async () => {
  //     return {
  //       status: 'success',
  //       url: 'test'
  //     } as any;
  //   });
  //   const wrapper = mount(Uploader, {
  //     props: {
  //       accept: 'image',
  //       action: 'test',
  //       customSend: customUpload,
  //       compress: false,
  //       repeatUpload: false
  //     }
  //   });

  //   const file = new File(['image'], 'hello.png', { type: 'image/png' });
  //   const uploadInput = wrapper.find('#uploaderInput');
  //   await userEvent.upload(uploadInput.element as HTMLElement, file);
  //   await userEvent.upload(uploadInput.element as HTMLElement, file);
  //   expect(wrapper.props().modelValue?.length).toBe(1);
  // });

  it('upload multiple file', async () => {
    const customUpload = vi.fn(async () => ({
      url: 'test',
      status: 'success'
    }));
    const wrapper = mount(Uploader, {
      props: {
        action: 'test',
        customSend: customUpload as any,
        compress: false,
        multiple: true
      }
    });

    const files = [
      new File(['image'], 'hello.png', { type: 'image/png' }),
      new File(['video'], 'hello.mp4', { type: 'video/mp4' }),
      new File(['file'], 'hello.txt', { type: 'text/plain' }),
      new File(['file'], 'hello.txt')
    ];

    const uploadInput = wrapper.find('#uploaderInput');
    await userEvent.upload(uploadInput.element as HTMLElement, files);
    expect(wrapper.props().modelValue?.length).toBe(4);
  });

  it('upload accept file', async () => {
    const wrapper = mount(Uploader, {
      props: {
        action: 'test',
        compress: false
      }
    });
    const accepts = {
      all: '*',
      file: '*',
      media: 'audio/*,video/*',
      image: 'image/*',
      video: 'video/*'
    };
    for (const [type, accept] of Object.entries(accepts)) {
      await wrapper.setProps({ accept: type as any });
      expect(wrapper.find('#uploaderInput').attributes('accept')).toBe(accept);
    }
  });

  it('delete upload file', async () => {
    const onDelete = vi.fn();
    const wrapper = mount(Uploader, {
      props: {
        action: 'test',
        compress: false,
        multiple: true,
        onDelete: onDelete
      }
    });

    const uploadInput = wrapper.find('#uploaderInput');
    await userEvent.upload(
      uploadInput.element as HTMLElement,
      new File(['image'], 'hello.png', { type: 'image/png' })
    );
    const uploadItems = wrapper.findAll(
      '.weui-uploader__files .weui-uploader__file'
    );
    expect(uploadItems.length).toBe(1);
    await uploadItems[0].find('.delete-upload-btn').trigger('click');
    expect(onDelete).toHaveBeenCalled();
  });
});
