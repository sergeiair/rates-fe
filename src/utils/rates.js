
export function deductPercent(value, percent) {
    return value - ((value / 100)  * percent);
}

export function addPercent(value, percent) {
    return value + ((value / 100)  * percent);
}

export function round5(value) {
    return Math.round((value + Number.EPSILON) * 100000) / 100000
}
