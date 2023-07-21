export function asyncSleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function* splitIntoBatches<T>(
    list: T[],
    maxBatchSize: number
): Generator<T[]> {
    if (list.length <= maxBatchSize) {
        yield list
    } else {
        let offset = 0
        while (list.length - offset > maxBatchSize) {
            yield list.slice(offset, offset + maxBatchSize)
            offset += maxBatchSize
        }
        yield list.slice(offset)
    }
}
