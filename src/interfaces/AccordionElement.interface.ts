import LinkListWithTitle from './LinkListWithTitle.interface';
import ListWithTitle from './ListWithTitle.interface';
import Textblock from './textblock.interface';

export default interface AccordionElement {

    textblock?: Textblock

    list?: ListWithTitle

    links?: LinkListWithTitle

}

