import {takeLatest} from "@redux-saga/core/effects";
import {
    callCheckSchedulersState,
    callCommitPrediction,
    callComputeCurrentPrediction,
    callEnableScheduler,
    callFetchHistory,
    callClearPredictions,
    callFetchPredictions,
    callLogOut,
    callRecomputePredictions,
    onAppInit
} from "./";
import {
    callCreatePw,
    callLogIn,
    callPrepareTFPrediction,
    callRegisterUser,
    callRestorePw,
    callVerifyPrediction,
} from "./calls";
import {actionTypes} from "../actions/types";

export function* fetchHistoryWatcher() {
    yield takeLatest(actionTypes.REQUEST_HISTORY, callFetchHistory)
}

export function* clearPredictionsWatcher() {
    yield takeLatest(actionTypes.CLEAR_PREDICTIONS, callClearPredictions)
}

export function* fetchPredictionsWatcher() {
    yield takeLatest(actionTypes.REQUEST_PREDICTIONS, callFetchPredictions)
}

export function* checkSchedulersStateWatcher() {
    yield takeLatest('CHECK_SCHEDULERS_STATE', callCheckSchedulersState)
}

export function* enableSchedulerWatcher() {
    yield takeLatest('ENABLE_SCHEDULER', callEnableScheduler)
}

export function* commitPredictionsWatcher() {
    yield takeLatest(actionTypes.COMMIT_PREDICTION, callCommitPrediction)
}

export function* recomputePredictionsWatcher() {
    yield takeLatest(actionTypes.RECOMPUTE_PREDICTIONS, callRecomputePredictions)
}

export function* computeCurrentPredictionWatcher() {
    yield takeLatest(actionTypes.COMPUTE_CURRENT_PREDICTION, callComputeCurrentPrediction)
}

export function* prepareTFPredictionWatcher() {
    yield takeLatest(actionTypes.PREPARE_TF_PREDICTION, callPrepareTFPrediction)
}

export function* verifyPredictionWatcher() {
    yield takeLatest(actionTypes.VERIFY_PREDICTION, callVerifyPrediction)
}

export function* appInitWatcher() {
    yield takeLatest(actionTypes.INIT_APP, onAppInit)
}

export function* registerUserWatcher() {
    yield takeLatest(actionTypes.REGISTER_USER, callRegisterUser)
}

export function* logInWatcher() {
    yield takeLatest(actionTypes.LOG_IN, callLogIn)
}

export function* logOutWatcher() {
    yield takeLatest(actionTypes.LOG_OUT, callLogOut)
}

export function* restorePwWatcher() {
    yield takeLatest(actionTypes.RESTORE_PW, callRestorePw)
}

export function* createPwWatcher() {
    yield takeLatest(actionTypes.CREATE_PW, callCreatePw)
}


