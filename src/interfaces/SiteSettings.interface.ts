export default interface SiteSettings {

    id?: string;
    _id?: string;

    shopify?: any;

    settings?: {
        url?: string;
        noSSR?: boolean;
        noRendering?: boolean;
        title?: string;
        filename?: string[];
    }

}
