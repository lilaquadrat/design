import Link from './link.interface';

export default interface Sitemap {

    title?: string
    elements: {
        title?: string
        elements: Link[]
    }[]
}
