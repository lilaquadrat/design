import Link from './link.interface';
import Textblock from './textblock.interface';

export default interface Sitemap {

    title?: string
    address?: string[]

    elements: {
        title?: string
        elements: Link[]
    }[]
}
