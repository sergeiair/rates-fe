
export function predsToGraphDataSet(data) {
    return data.sort((a, b) => {
            return a.time - b.time;
        }).map(item => {
            if (item.realRate <= item.predRate) {
                return {
                    x: new Date(item.time),
                    y: item.finalRate - item.predRate
                }
            } else {
                return {
                    x: new Date(item.time),
                    y: item.predRate - item.finalRate
                };
            }
        })
}

export function getInitialVerifAvgRiseChange(data) {
    if (!!data.length) {
        return data.reduce((acc, curr) => {
            acc += curr.finalRate - curr.realRate;

            return acc;
        }, 0) / data.length;
    } else {
        return 0;
    }
}

export function getInitialPredAvgRiseChange(data) {
    if (!!data.length) {
        return data.reduce((acc, curr) => {
            acc += curr.finalRate - curr.predRate;

            return acc;
        }, 0) / data.length;
    } else {
        return 0;
    }
}

export function getInitialVerifAvgFallChange(data) {
    if (!!data.length) {
        return data.reduce((acc, curr) => {
            acc += curr.realRate - curr.finalRate;

            return acc;
        }, 0) / data.length;
    } else {
        return 0;
    }
}

export function getInitialPredAvgFallChange(data) {
    if (!!data.length) {
        return data.reduce((acc, curr) => {
            acc += curr.predRate - curr.finalRate;

            return acc;
        }, 0) / data.length;
    } else {
        return 0;
    }
}

export function getFilteredPredictions(data, filter = { name: null, value: null }) {
    if (!filter.value) return data || [];

    switch (filter.name) {
        case 'filter':
            if (filter.value === 'successful') {
                return (data || [])
                    .filter(pred => isPredCompleted(pred) && isPredSuccessful(pred));
            } else {
                return (data || [])
                    .filter(pred => isPredCompleted(pred) && !isPredSuccessful(pred));
            }
        case 'currency':
            return (data || [])
                .filter(pred => pred.pair === filter.value);
        default:
            return data || [];
    }
}

export function isPredCompleted(pred) {
    return !!pred.finalRate && !!pred.verifyTime;
}

export function isPredSuccessful(pred) {
    if (pred.realRate < pred.predRate) {
        return pred.finalRate >= pred.predRate;
    } else {
        return pred.finalRate < pred.predRate;
    }
}
