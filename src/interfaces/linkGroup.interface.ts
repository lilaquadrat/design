export default interface LinkGroup {
    classes: string;
    links: LinkGroupLink[]
}

export default interface LinkGroupLink {
    link: string;
    text: string;
    options: {[key: string]: any}
};
