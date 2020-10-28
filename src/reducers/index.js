import {SessionStorage} from "../utils/sessionStorage";
import {actionTypes} from "../actions/types";

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
    currentPrediction: {},
    user: {
        email: null,
        name: null,
        token: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_APP':
            return {
                ...state,
                user: {
                    email: null,
                    name: null,
                    token: SessionStorage.token
                }
            };
        case 'REQUEST_RATES_DONE':
            const { data, target } = action.payload;
            const values = !!data && !!data.rates ? data.rates[0] : {};

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
                history: action.payload.data ? action.payload.data.rates || [] : []
            };
        case 'REQUEST_PREDICTIONS_DONE':
            return {
                ...state,
                predictions: action.payload.data ? action.payload.data.predictions || [] : []
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
                    ...action.payload
                }
            };
        case 'LOG_OUT_DONE':
            return {
                ...state,
                user: {
                    email: null,
                    name: null,
                    token: null
                }
            };
        case actionTypes.COMPUTE_CURRENT_PREDICTION + 'DONE':
            return { ...state, ...action.payload };
        case 'REQUEST_ERROR':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export default reducer;

