

export const requestRates = (payload) => ({
	type: 'REQUEST_RATES',
	payload
});

export const requestHistory = (payload) => ({
	type: 'REQUEST_HISTORY',
	payload
});


export const commitPredictions = (payload) => ({
	type: 'COMMIT_PREDICTIONS',
	payload
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

export const requestError = () => ({
	type: 'REQUEST_ERROR',
});
