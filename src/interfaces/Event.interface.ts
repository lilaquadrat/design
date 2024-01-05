
export default interface TypedEvent<T> extends Omit<Event, 'target'> {
    target: T
} 