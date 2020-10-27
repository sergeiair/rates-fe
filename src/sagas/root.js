import {all} from 'redux-saga/effects';
import {
    checkSchedulersStateWatcher,
    commitPredictionsWatcher,
    enableSchedulerWatcher,
    fetchPredictionsWatcher,
    fetchRatesWatcher,
    fetchHistoryWatcher,
    registerUserWatcher,
    logInWatcher,
    logOutWatcher
} from './watchers';

export default function* rootSaga() {
    yield all([
        fetchRatesWatcher(),
        fetchHistoryWatcher(),
        fetchPredictionsWatcher(),
        commitPredictionsWatcher(),
        checkSchedulersStateWatcher(),
        enableSchedulerWatcher(),
        registerUserWatcher(),
        logInWatcher(),
        logOutWatcher()
    ]);
}
