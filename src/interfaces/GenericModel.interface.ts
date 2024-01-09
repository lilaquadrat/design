export default interface GenericModel {

    [key: string]:
    string |
    number |
    boolean |
    GenericModel |
    unknown |
    (string | number | boolean | GenericModel)[] |
    Record<string, GenericModel>

    /**
     * unique id for this model
     */
    uuid?: string
    /**
     * is used for identifying the correct edit module
     */
    type?: string

}