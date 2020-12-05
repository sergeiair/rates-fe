import {put} from "@redux-saga/core/effects";
import {toast} from 'react-toastify';
import {SessionStorage} from "../utils/sessionStorage";
import {internalLogOut} from "../utils/user";
import AppHistory from "../utils/appHistory";
import {actionTypes} from "../actions/types";

const axios = require('axios').default;
const notifyError = (error) => toast.error(error.message);
const notifySuccess = (error) => toast.success(error.message);

axios.interceptors.response.use((response) => {
    if(response.status === 401) internalLogOut();

    return response;
}, (error) => {
    if(!!error.status && error.status === 401
        || error.message.indexOf('401') > 0) {
            internalLogOut();
    }

    return Promise.reject(error.message);
});

export function initAuthHeaders(token) {
    axios.defaults.headers.common['GoAway'] = token;
}

export function* onAppInit() {
    yield put({ type: actionTypes.INIT_APP + 'DONE' });
}

export function* callFetchHistory(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/rates/history?limit=${args.payload.limit}`;

    const json = yield axios.get(url)
        .then(response => response.data)
        .catch(notifyError);

    yield put({
        type: actionTypes.REQUEST_HISTORY + 'DONE', payload: json
    });
}

export function* callCommitPrediction(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/predictions`;

    const json = yield axios.post(url, args.payload)
        .then(response => {
            args.history.push('/review');
            return response.data;
        })
        .catch(notifyError);

    yield put({ type: "COMMIT_PREDICTION_DONE", payload: json });
}

export function* callFetchPredictions() {
    const url = `${process.env.REACT_APP_BASE_URL}/api/predictions`;

    const json = yield axios.get(url)
        .then(response => response.data)
        .catch(notifyError);

    yield put({ type: "REQUEST_PREDICTIONS_DONE", payload: json });
}

export function* callCheckSchedulersState() {
    const ratesSchedulerUrl = `${process.env.REACT_APP_BASE_URL}/api/rates-scheduler/status`;
    const predictionsSchedulerUrl = `${process.env.REACT_APP_BASE_URL}/api/predictions-scheduler/status`;
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
    const url = `${process.env.REACT_APP_BASE_URL}/api/${args.payload.name}-scheduler/enable`;

    const json = yield axios.post(url)
        .then(response => response.data)
        .catch(notifyError);

    yield put({ type: "ENABLE_SCHEDULER_DONE", payload: {...json, name: args.payload.name} });
}

export function* callRegisterUser(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/users/register`;

    const json = yield axios.post(url, args.payload)
        .then(response => response.data)
        .catch(notifyError);

    if (!!json.data.resp && !!json.data.resp._error) {
        notifyError({ message: json.data.resp._error });
    } else {
        AppHistory.instance.push('/');
        notifySuccess({ message: "Now you can log in" });
    }

    yield put({ type: actionTypes.REGISTER_USER + 'DONE', payload: json });
}

export function* callLogIn(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/users/login`;

    const json = yield axios.post(url, args.payload)
        .then(response => {
            SessionStorage.pickFromHeader(response.headers);
            initAuthHeaders(SessionStorage.token);

            return !!response ? response.data : {data: null};
        })
        .catch(notifyError);

    if (!!json.data) {
        yield put({ type: actionTypes.LOG_IN + 'DONE', payload: {
            ...json.data, token: SessionStorage.token
        }});
    } else {
        notifyError({message: "Failed to log in"});
        yield put({ type: actionTypes.LOG_IN + 'FAIL' });
    }
}

export function* callLogOut() {
    const url = `${process.env.REACT_APP_BASE_URL}/api/users/logout`;

    yield axios.post(url)
        .then(response => {
            internalLogOut();
            return response.data;
        })
        .catch(notifyError);

    yield put({ type: actionTypes.LOG_OUT + 'DONE' });
}

export function* callRestorePw(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/users/restore`;

    const json = yield axios.post(url, { user: args.payload })
        .then(response => {
            return response.data;
        })
        .catch(notifyError);

    if (json.message === 'Done') {
        notifySuccess({message: 'Please check your email'});
    }

    yield put({ type: actionTypes.RESTORE_PW + 'DONE' });
}

export function* callCreatePw(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/users/create-pw`;

    yield axios.post(url, args.payload)
        .then(response => {
            return response.data;
        })
        .catch(notifyError);

    yield put({ type: actionTypes.CREATE_PW + 'DONE' });
}


export function* callRecomputePredictions(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/analyze/completed`;

    const json = yield axios.post(url, args.payload)
        .then(response => {
            return response.data.data;
        })
        .catch(notifyError);

    yield put({ type: actionTypes.RECOMPUTE_PREDICTIONS + 'DONE', payload: json  });
}

export function* callComputeCurrentPrediction(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/predictions/compute-current`;

    const json = yield axios.post(url, args.payload)
        .then(response => {
            const { result } = response.data.data;
            return result[0];
        })
        .catch(notifyError);

    yield put({ type: actionTypes.COMPUTE_CURRENT_PREDICTION + 'DONE', payload: json  });
}

export function* callPrepareTFPrediction(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/predictions/prepare-for-history`;

    const json = yield axios.post(url, args.payload)
        .then(response => {
            const { data } = response.data;

            return data;
        })
        .catch(notifyError);

    yield put({ type: actionTypes.PREPARE_TF_PREDICTION + 'DONE', payload: json });
}

export function* callVerifyPrediction(args) {
    const url = `${process.env.REACT_APP_BASE_URL}/api/predictions/verify`;

    const json = yield axios.post(url, args.payload)
        .then(response => {
            const { data } = response.data;
            return data;
        })
        .catch(notifyError);

    yield put({ type: actionTypes.VERIFY_PREDICTION + 'DONE', payload: json });
}
