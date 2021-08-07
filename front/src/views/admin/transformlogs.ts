interface FormmatedLogs {
    datetime: string,
    level: string,
    category: string,
    body: string,
    tags: string,
}

const ensureNoEmpty = (item: any): string => {
    return item ? item : ''
}

export const transform = (content: Array<string>):FormmatedLogs[] => {
    return content.map(line => {
        let parts = line.split('~~')
        return {
            datetime: ensureNoEmpty(parts[0]),
            level: ensureNoEmpty(parts[1]),
            category: ensureNoEmpty(parts[2]),
            body: ensureNoEmpty(parts[4]),
            tags: ensureNoEmpty(parts[3]),
        }
    })
}

export const ensureclean = (list: Array<string>):Array<string> => {
    return list.filter(item => {
        return item !== null && typeof item === 'string'
    })
}