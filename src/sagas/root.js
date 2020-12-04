import {all} from 'redux-saga/effects';
import {
    appInitWatcher,
    checkSchedulersStateWatcher,
    commitPredictionsWatcher,
    enableSchedulerWatcher,
    fetchPredictionsWatcher,
    recomputePredictionsWatcher,
    fetchRatesWatcher,
    fetchHistoryWatcher,
    registerUserWatcher,
    logInWatcher,
    logOutWatcher,
    computeCurrentPredictionWatcher,
    restorePwWatcher,
    createPwWatcher,
    prepareTFPredictionWatcher,
    verifyPredictionWatcher
} from './watchers';

export default function* rootSaga() {
    yield all([
        appInitWatcher(),
        fetchRatesWatcher(),
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
        verifyPredictionWatcher()
    ]);
}
