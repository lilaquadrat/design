// returns a copy of the object without any references
export default <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T;
