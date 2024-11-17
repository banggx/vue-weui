import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Gallery from '../gallery.vue';
import { h } from 'vue';

describe('weui-gallery', () => {
  it('gallery render', () => {
    const wrapper = mount(Gallery, {
      props: {
        initialIndex: 1,
        urls: ['test1.jpg', 'test2.jpg'],
        visible: true
      }
    });

    expect(
      wrapper.find('.weui-gallery__img-wrap').element.children.length
    ).toEqual(2);
    expect(wrapper.find('.gallery-counter').text()).toEqual('2/2');
  });

  it('gallery item slot render', () => {
    const images = ['test1.jpg', 'test2.jpg'];
    const wrapper = mount(Gallery, {
      props: {
        initialIndex: 0,
        urls: images,
        visible: true
      },
      slots: {
        item: ({ item }) => h('div', null, item)
      }
    });

    const imagesItems = wrapper.find('.weui-gallery__img-wrap').element
      .children;
    for (let i = 0; i < images.length; i++) {
      expect(imagesItems.item(i)?.textContent).toEqual(images[i]);
    }
  });

  it('gallery basic event trigger', () => {
    const wrapper = mount(Gallery, {
      props: {
        initialIndex: 0,
        urls: ['test1.jpg', 'test2.jpg'],
        visible: true
      },
      slots: {
        item: ({ item }) => h('div', null, item)
      }
    });

    wrapper.find('.weui-gallery__del').trigger('click');
    expect(wrapper.emitted().delete).toBeTruthy();
    wrapper.find('.gallery-close__btn').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('gallery toggle image', async () => {
    const wrapper = mount(Gallery, {
      props: {
        initialIndex: 0,
        urls: ['test1.jpg', 'test2.jpg'],
        visible: true
      },
      slots: {
        item: ({ item }) => h('div', null, item)
      }
    });

    // 右滑
    const threshold = window.innerWidth / 3;
    const imageWrapper = wrapper.find('.weui-gallery__img-wrap');
    await imageWrapper.trigger('touchstart', {
      changedTouches: [{ clientX: 50 + threshold + 20, clientY: 100 }]
    });
    await imageWrapper.trigger('touchmove', {
      changedTouches: [{ clientX: 50, clientY: 100 }]
    });
    await imageWrapper.trigger('touchend', {
      changedTouches: [{ clientX: 50, clientY: 100 }]
    });
    expect(wrapper.emitted().change).toBeTruthy();

    // 左滑
    wrapper.vm.updateIndex(1);
    await imageWrapper.trigger('touchstart', {
      changedTouches: [{ clientX: 50, clientY: 100 }]
    });
    await imageWrapper.trigger('touchmove', {
      changedTouches: [{ clientX: 50 + threshold + 20, clientY: 100 }]
    });
    await imageWrapper.trigger('touchend', {
      changedTouches: [{ clientX: 50 + threshold + 20, clientY: 100 }]
    });
    expect(wrapper.emitted().change.length).toEqual(2);
  });

  it('gallery toggle image no swipe', async () => {
    const wrapper = mount(Gallery, {
      props: {
        initialIndex: 0,
        urls: ['test1.jpg', 'test2.jpg'],
        visible: true
      },
      slots: {
        item: ({ item }) => h('div', null, item)
      }
    });

    // 右滑
    const threshold = window.innerWidth / 3;
    const imageWrapper = wrapper.find('.weui-gallery__img-wrap');
    await imageWrapper.trigger('touchstart', {
      changedTouches: [{ clientX: 50 + threshold - 20, clientY: 100 }]
    });
    await imageWrapper.trigger('touchmove', {
      changedTouches: [{ clientX: 50, clientY: 100 }]
    });
    await imageWrapper.trigger('touchend', {
      changedTouches: [{ clientX: 50, clientY: 100 }]
    });
    expect(wrapper.emitted().change).toBeUndefined();
  });
});
