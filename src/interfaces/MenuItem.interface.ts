import PicturePartial from '@partials/picture.partial.vue';

export default interface MenuItemElement {
    title: string
    description: string
    price: string
    properties: string[]
    allergens: string[]
    picture: PicturePartial
}
