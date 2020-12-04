import {SessionStorage} from "../utils/sessionStorage";
import {actionTypes} from "../actions/types";
import * as R from "ramda";

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
    predictionsFilter: null,
    predictionsPair: null,
    currentPrediction: {
        value: null,
        status: 'pending'
    },
    analyze: {
        pairs: [],
        preds: []
    },
    user: {
        email: null,
        name: null,
        token: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_APP:
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
                predictionsFilter: initialState.predictionsFilter,
                predictions: action.payload.data ? action.payload.data.predictions || [] : []
            };
        case actionTypes.SET_PREDICTIONS_FILER:
            if (action.payload.name === 'filter') {
                return {
                    ...state,
                    predictionsFilter: action.payload.value
                };
            } else if (action.payload.name === 'pair') {
                return {
                    ...state,
                    predictionsPair: action.payload.value
                };
            } else {
                return state;
            }
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
        case actionTypes.LOG_IN + 'DONE':
            return {
                ...state,
                user: {
                    ...action.payload
                }
            };
        case actionTypes.LOG_OUT + 'DONE':
            return {
                ...state,
                user: {
                    email: null,
                    name: null,
                    token: null
                }
            };
        case actionTypes.RECOMPUTE_PREDICTIONS + 'DONE':
            const preds = action.payload.data || [];

            return {
                ...state,
                analyze: {
                    ...state.analyze,
                    pairs: R.uniq(preds.map((pred) => pred.pair)),
                    preds
                }
            };
        case actionTypes.VERIFY_PREDICTION + 'DONE':
            if (!!action.payload.data) {
                return {
                    ...state,
                    predictions: state.predictions
                        .map((pred) =>
                            pred.id === action.payload.data.id ? action.payload.data : pred
                        )
                };
            } else {
                return state;
            }
        case actionTypes.COMPUTE_CURRENT_PREDICTION + 'DONE':
            return {
                ...state,
                currentPrediction: {
                    status: 'done',
                    value: action.payload
                }
            };
        case actionTypes.RESET_CURRENT_PREDICTION:
            return {
                ...state,
                currentPrediction: {
                    status: 'pending',
                    value: null
                }
            };
        case actionTypes.PREPARE_TF_PREDICTION:
            return {
                ...state,
                currentPrediction: {
                    ...state.currentPrediction,
                    status: 'preparing'
                }
            };
        case actionTypes.PREPARE_TF_PREDICTION + 'DONE':
            return {
                ...state,
                currentPrediction: {
                    status: action.payload.status,
                    value: state.currentPrediction.value
                }
            };
        case 'REQUEST_ERROR':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export default reducer;

