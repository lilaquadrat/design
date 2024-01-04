export default interface EditorBase {
    type: string,

    maxLength?: number,
    minLength?: number,

    required?: boolean,

    html?: boolean
}
