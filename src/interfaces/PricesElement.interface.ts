import Link from './link.interface';
import Textblock from './textblock.interface';

export default interface PricesElementModel {

    textblock: Textblock;

    facts: string[];

    price: string;

    interval: string;

    variant: string[];

    callToAction: Link;

    more: Link;

  }

