const useFindItem = (value: string, arr: any[]): string => {
    const item = arr.find((item: string) => item.startsWith(value)) ?? ''
    const split = item ? item.split('-')[1] : ''

    if (split) return split

    return item
}

export default useFindItem
