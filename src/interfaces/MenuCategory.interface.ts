import MenuItemElement from './MenuItem.interface';
import Textblock from './textblock.interface';

export default interface MenuCategoryElement {
    textblock: Textblock
    items: MenuItemElement[]
  }
