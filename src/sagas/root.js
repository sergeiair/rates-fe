import {all} from 'redux-saga/effects';
import {
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
    computeCurrentPredictionWatcher
} from './watchers';

export default function* rootSaga() {
    yield all([
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
        computeCurrentPredictionWatcher()
    ]);
}
