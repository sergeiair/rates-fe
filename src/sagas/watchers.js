import {takeLatest} from "@redux-saga/core/effects";
import {
    callCheckSchedulersState,
    callCommitPredictions,
    callEnableScheduler,
    callFetchHistory,
    callFetchPredictions,
    callFetchRates
} from "./";
import {callLogIn, callRegisterUser} from "./calls";

export function* fetchRatesWatcher() {
    yield takeLatest('REQUEST_RATES', callFetchRates)
}

export function* fetchHistoryWatcher() {
    yield takeLatest('REQUEST_HISTORY', callFetchHistory)
}

export function* fetchPredictionsWatcher() {
    yield takeLatest('REQUEST_PREDICTIONS', callFetchPredictions)
}

export function* checkSchedulersStateWatcher() {
    yield takeLatest('CHECK_SCHEDULERS_STATE', callCheckSchedulersState)
}

export function* enableSchedulerWatcher() {
    yield takeLatest('ENABLE_SCHEDULER', callEnableScheduler)
}

export function* commitPredictionsWatcher() {
    yield takeLatest('COMMIT_PREDICTIONS', callCommitPredictions)
}

export function* registerUserWatcher() {
    yield takeLatest('REGISTER_USER', callRegisterUser)
}

export function* logInWatcher() {
    yield takeLatest('LOG_IN', callLogIn)
}

