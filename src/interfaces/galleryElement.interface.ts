import Picture from './picture.interface';
import Textblock from './textblock.interface';

export interface GalleryElement {
  picture: Picture;
  pictures: Picture[];

  textblock: Textblock;

}
