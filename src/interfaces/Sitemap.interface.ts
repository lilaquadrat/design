
import LinkListWithTitle from "./LinkListWithTitle.interface";
// export default interface Sitemap {



//     title?: string
//     address?: string[]

//     elements: {
//         title?: string
//         elements: Link[]
//     }[]
// }

export default interface Sitemap {
    elements?: {
        links: LinkListWithTitle;
    }
}

