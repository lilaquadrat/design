export interface PictureMedia {
  src: string
  media: string,
}
export default interface Picture {
  src: string,
  alt: string

  source?: PictureMedia[]

}
