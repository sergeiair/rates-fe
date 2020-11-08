
export function historyToGraphDataSet(data, currency) {
    return data.map(item => [new Date(item.time), item[currency]])
}
