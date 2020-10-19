import {put} from "@redux-saga/core/effects";
import {toast} from 'react-toastify';

const axios = require('axios').default;
const notifyError = (error) => toast.error(error.message);

export function* callFetchRates(args) {
    const url = `http://localhost:3333/api/rates/pair?base=${
        args.payload.curr1}&second=${args.payload.curr2}`;

    const json = yield axios.get(url)
        .then(response => response.data)
        .catch(notifyError);

    yield put({
        type: "REQUEST_RATES_DONE", payload: {
            ...json,
            target: args.payload.curr2
        }
    });
}

export function* callFetchHistory(args) {
    const url = `http://localhost:3333/api/rates/history?base=${
        args.payload.base}&limit=${args.payload.limit}`;

    const json = yield axios.get(url)
        .then(response => response.data)
        .catch(notifyError);

    yield put({
        type: "REQUEST_HISTORY_DONE", payload: json
    });
}

export function* callCommitPredictions(args) {
    const url = `http://localhost:3333/api/predictions`;

    const json = yield axios.post(url, args.payload)
        .then(response => {
            window.location.href = '/review';
            return response.data;
        })
        .catch(notifyError);

    yield put({ type: "COMMIT_PREDICTIONS_DONE", payload: json });
}

export function* callFetchPredictions() {
    const url = `http://localhost:3333/api/predictions`;

    const json = yield axios.get(url)
        .then(response => response.data)
        .catch(notifyError);

    yield put({ type: "REQUEST_PREDICTIONS_DONE", payload: json });
}

export function* callCheckSchedulersState() {
    const ratesSchedulerUrl = `http://localhost:3333/api/rates-scheduler/status`;
    const predictionsSchedulerUrl = `http://localhost:3333/api/predictions-scheduler/status`;
    const ratesRequest = axios.get(ratesSchedulerUrl);
    const predictionsRequest = axios.get(predictionsSchedulerUrl);

    const json = yield axios.all([
        ratesRequest,
        predictionsRequest
    ])
        .then(response => response.map((data) => data.data))
        .catch(notifyError);

    yield put({ type: "CHECK_SCHEDULERS_STATE_DONE", payload: json });
}

export function* callEnableScheduler(args) {
    const url = `http://localhost:3333/api/${args.payload.name}-scheduler/enable`;

    const json = yield axios.post(url)
        .then(response => response.data)
        .catch(notifyError);

    yield put({ type: "ENABLE_SCHEDULER_DONE", payload: {...json, name: args.payload.name} });
}
