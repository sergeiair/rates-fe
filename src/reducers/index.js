
const initialState = {
    schedulers: {
      rates: 0,
      predictions: 0
    },
    rates: {
        base: 'USD',
        target: 'EUR'
    },
    history: [],
    predictions: [],
    user: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_RATES_DONE':
            const { data, target } = action.payload;
            const values = !!data.rates && data.rates.length ? data.rates[0] : {};

            return {
                ...state,
                rates: {
                    ...values,
                    target
                }
            };
        case 'REQUEST_HISTORY_DONE':
            return {
                ...state,
                history: action.payload.data.rates
            };
        case 'REQUEST_PREDICTIONS_DONE':
            return {
                ...state,
                predictions: action.payload.data.predictions
            };
        case 'CHECK_SCHEDULERS_STATE_DONE':
            return {
                ...state,
                schedulers: {
                    ...state.schedulers,
                    rates: action.payload[0].data.status,
                    predictions: action.payload[1].data.status
                }
            };
        case 'ENABLE_SCHEDULER_DONE':
            return {
                ...state,
                schedulers: {
                    ...state.schedulers,
                    [action.payload.name]: action.payload.data.status
                }
            };
        case 'LOG_IN_DONE':
            return {
                ...state,
                user: {
                    ...action.payload.data
                }
            };
        case 'REQUEST_ERROR':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export default reducer;

