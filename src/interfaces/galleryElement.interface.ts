import type Picture from './picture.interface';
import type Textblock from './textblock.interface';

export interface GalleryElement {
  picture: Picture;
  pictures: Picture[];

  textblock: Textblock;

}
