import Link from './link.interface';
import LinkListWithTitle from './LinkListWithTitle.interface';
import ListWithTitle from './ListWithTitle.interface';
import Picture from './picture.interface';
import Textblock from './textblock.interface';

export default interface PicturegroupElement {

    picture?: Picture;

    link?: Link;

    description?: Textblock;

    textblock?: Textblock;

    list?: ListWithTitle

    links?: LinkListWithTitle;

  }

