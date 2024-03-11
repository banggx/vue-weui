import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Article from '../article.vue';

describe('weui-article', () => {
  it('render default slot', () => {
    const articleText = '这是文章内容';
    const wrapper = mount(Article, {
      slots: {
        default: articleText
      }
    });
    expect(wrapper.text()).toBe(articleText);
  });
});
