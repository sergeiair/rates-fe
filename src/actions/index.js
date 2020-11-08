import {actionTypes} from "./types";

export const initApp = () => ({
	type: 'INIT_APP'
});

export const requestRates = (payload) => ({
	type: 'REQUEST_RATES',
	payload
});

export const requestHistory = (payload) => ({
	type: 'REQUEST_HISTORY',
	payload
});

export const commitPredictions = (payload, history) => ({
	type: 'COMMIT_PREDICTION',
	payload,
	history
});

export const requestPredictions = (payload) => ({
	type: 'REQUEST_PREDICTIONS',
	payload
});

export const checkSchedulersState = () => ({
	type: 'CHECK_SCHEDULERS_STATE'
});

export const enableScheduler = (payload) => ({
	type: 'ENABLE_SCHEDULER',
	payload
});

export const registerUser = (payload) => ({
	type: 'REGISTER_USER',
	payload
});

export const login = (payload) => ({
	type: 'LOG_IN',
	payload
});

export const restorePw = (payload) => ({
	type: actionTypes.RESTORE_PW,
	payload
});

export const createPw = (payload) => ({
	type: actionTypes.CREATE_PW,
	payload
});


export const logout = (history) => ({
	type: 'LOG_OUT',
	history
});

export const computeCurrentPrediction = (payload) => ({
	type: 'COMPUTE_CURRENT_PREDICTION',
	payload
});

export const recomputePredictions = (payload) => ({
	type: actionTypes.RECOMPUTE_PREDICTIONS,
	payload
});

export const requestError = () => ({
	type: 'REQUEST_ERROR',
});
