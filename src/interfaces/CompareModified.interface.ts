export interface CompareHeadline {
    headline?: string
    description?: string
    structure: boolean
}

export default interface CompareModified extends Array<any> {
    [key: number]:
    string
    | CompareHeadline
}
