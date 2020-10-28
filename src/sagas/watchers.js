import {takeLatest} from "@redux-saga/core/effects";
import {
    callCheckSchedulersState,
    callCommitPrediction,
    callComputeCurrentPrediction,
    callEnableScheduler,
    callFetchHistory,
    callFetchPredictions,
    callFetchRates,
    callLogOut,
    callRecomputePredictions
} from "./";
import {callLogIn, callRegisterUser} from "./calls";
import {actionTypes} from "../actions/types";

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
    yield takeLatest('COMMIT_PREDICTION', callCommitPrediction)
}

export function* recomputePredictionsWatcher() {
    yield takeLatest(actionTypes.RECOMPUTE_PREDICTIONS, callRecomputePredictions)
}

export function* computeCurrentPredictionWatcher() {
    yield takeLatest(actionTypes.COMPUTE_CURRENT_PREDICTION, callComputeCurrentPrediction)
}

export function* registerUserWatcher() {
    yield takeLatest('REGISTER_USER', callRegisterUser)
}

export function* logInWatcher() {
    yield takeLatest('LOG_IN', callLogIn)
}

export function* logOutWatcher() {
    yield takeLatest('LOG_OUT', callLogOut)
}



