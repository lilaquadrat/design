export default interface DataObject<T> {
    count?: number;
    all?: number;

    sites?: {
        first: number,
        last: number,
        current: number
    }

    data?: T;
}
