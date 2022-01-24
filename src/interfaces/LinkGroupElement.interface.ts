import Link from './link.interface';

export default interface LinkGroupElement {

    text: string;

    link: string

    classes: string[]

    attributes: string[];

    external: boolean;

    links: Link

    icon: string;


  }

