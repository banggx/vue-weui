import { ShallowRef, computed } from 'vue';
import { AcceptType } from '../types';
import { Maybe } from '@/types';

export function useAccpect(type?: ShallowRef<Maybe<AcceptType>>) {
  return computed(() => {
    switch (type?.value) {
      case 'all':
        return '*';
      case 'media':
        return 'audio/*,video/*';
      case 'image':
        return 'image/*';
      case 'file':
        return '*';
      case 'video':
        return 'video/*';
      default:
        return '';
    }
  });
}
