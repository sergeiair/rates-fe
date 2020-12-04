import {round4} from "./rates";

export function predsToGraphDataSet(data) {
    return data.map(item => {
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

export function predsToBubbleDataSet(data) {
    return data.map((item, i) => {
        if (item.realRate <= item.predRate) {
            return {
                x: i,
                y: item.finalRate - item.realRate,
                r: (item.finalRate - item.predRate) * 10
            }
        } else {
            return {
                x: i,
                y: Math.abs(item.realRate - item.finalRate),
                r: Math.abs(item.predRate - item.finalRate) * 10
            };
        }
    }).filter((item) => item.r > 0);
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

/*export function getInitialVerifAvgFallChange(data) {
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
}*/

export function getFilteredPredictions(data, filter = '', pair = '') {
    if (!filter && !pair) return data || [];

    switch (filter) {
        case 'successful':
            return (data || [])
                .filter(pred => isPredCompleted(pred) && isPredSuccessful(pred) && isPairMatched(pred, pair));
        case 'unsuccessful':
            return (data || [])
                .filter(pred => isPredCompleted(pred) && !isPredSuccessful(pred) && isPairMatched(pred, pair));
        default:
            return (data || [])
                .filter(pred => isPairMatched(pred, pair));
    }
}

export function isPairMatched(pred, pair) {
    return !!pair ? pred.pair === pair : true;
}

export function isPredCompleted(pred) {
    return !!pred.finalRate && !!pred.verifyTime;
}

export function isPredSuccessful(pred) {
    const realPredDiff = pred.realRate - pred.predRate;
    const predFinalDiff = pred.realRate - pred.finalRate;

    if (round4(realPredDiff) === round4(predFinalDiff)) {
        return false;
    } else {
        return realPredDiff >= 0 ? predFinalDiff >= 0 : predFinalDiff < 0;
    }
}
