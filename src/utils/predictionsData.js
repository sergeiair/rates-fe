
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
