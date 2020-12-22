import {actionTypes} from "./types";

export const initApp = () => ({
	type: actionTypes.INIT_APP
});

export const requestRates = (payload) => ({
	type: actionTypes.REQUEST_RATES,
	payload
});

export const requestHistory = (payload) => ({
	type: actionTypes.REQUEST_HISTORY,
	payload
});

export const clearPredictions = () => ({
	type: actionTypes.CLEAR_PREDICTIONS
});

export const commitPredictions = (payload, history) => ({
	type: actionTypes.COMMIT_PREDICTION,
	payload,
	history
});

export const requestPredictions = (payload) => ({
	type: actionTypes.REQUEST_PREDICTIONS,
	payload
});

export const checkSchedulersState = () => ({
	type: 'CHECK_SCHEDULERS_STATE'
});

export const enableScheduler = (payload) => ({
	type: 'ENABLE_SCHEDULER',
	payload
});

export const prepareTFPrediction = (payload) => ({
	type: actionTypes.PREPARE_TF_PREDICTION,
	payload
});

export const registerUser = (payload) => ({
	type: actionTypes.REGISTER_USER,
	payload
});

export const login = (payload) => ({
	type: actionTypes.LOG_IN,
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
	type: actionTypes.LOG_OUT,
	history
});

export const computeCurrentPrediction = (payload) => ({
	type: actionTypes.COMPUTE_CURRENT_PREDICTION,
	payload
});

export const resetCurrentPrediction = () => ({
	type: actionTypes.RESET_CURRENT_PREDICTION
});

export const recomputePredictions = (payload) => ({
	type: actionTypes.RECOMPUTE_PREDICTIONS,
	payload
});

export const setPredictionsFilter = (payload) => ({
	type: actionTypes.SET_PREDICTIONS_FILER,
	payload
});

export const verifyPrediction = (payload) => ({
	type: actionTypes.VERIFY_PREDICTION,
	payload
});
