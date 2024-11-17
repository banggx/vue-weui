import { h, render } from 'vue';
import Gallery from './gallery.vue';
import { shortid } from '../utils';

interface GalleryOptions {
  urls: string[];
  current?: number;
  onChange?: (current: number) => void;
  onDelete?: (index: number, url: string) => void;
  onClose?: () => void;
}
export function gallery(options: GalleryOptions) {
  const { urls, current, onChange, onDelete, onClose } = options;

  const vnode = h(Gallery, {
    urls,
    initialIndex: current,
    visible: true,
    onChange,
    onDelete,
    onClose
  });
  const galleryFragment = document.createElement('div');
  galleryFragment.classList.add(`weui-gallery__teleport-container`);
  galleryFragment.classList.add(`weui-gallery_${shortid(16)}`);
  document.body.appendChild(galleryFragment);
  render(vnode, galleryFragment);

  const closeGallery = () => {
    render(null, galleryFragment);
    document.body.removeChild(galleryFragment);
  };

  return closeGallery;
}
