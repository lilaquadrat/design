export interface VideoSource {
  media: string
  source: string
}

export default interface Video {

  src: string;

  attributes?: string[]

  source?: VideoSource[]

}
