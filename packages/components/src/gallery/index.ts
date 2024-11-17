import _Gallery from './gallery.vue';
import { gallery } from './gallery';
import { withInstall } from '../utils';

type GalleryType = typeof _Gallery & {
  gallery: typeof gallery;
};
export const Gallery = withInstall<GalleryType>(_Gallery as GalleryType);
Gallery.gallery = gallery;
export default Gallery;
