import {all} from 'redux-saga/effects';
import {
    appInitWatcher,
    checkSchedulersStateWatcher,
    commitPredictionsWatcher,
    enableSchedulerWatcher,
    fetchPredictionsWatcher,
    recomputePredictionsWatcher,
    fetchHistoryWatcher,
    registerUserWatcher,
    logInWatcher,
    logOutWatcher,
    computeCurrentPredictionWatcher,
    restorePwWatcher,
    createPwWatcher,
    prepareTFPredictionWatcher,
    verifyPredictionWatcher,
    clearPredictionsWatcher
} from './watchers';

export default function* rootSaga() {
    yield all([
        appInitWatcher(),
        fetchHistoryWatcher(),
        fetchPredictionsWatcher(),
        commitPredictionsWatcher(),
        recomputePredictionsWatcher(),
        checkSchedulersStateWatcher(),
        enableSchedulerWatcher(),
        registerUserWatcher(),
        logInWatcher(),
        logOutWatcher(),
        computeCurrentPredictionWatcher(),
        restorePwWatcher(),
        createPwWatcher(),
        prepareTFPredictionWatcher(),
        verifyPredictionWatcher(),
        clearPredictionsWatcher()
    ]);
}
