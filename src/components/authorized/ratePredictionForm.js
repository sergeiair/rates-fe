import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import CurrenciesRate from "./currenciesRate";
import {useStore} from "react-redux";
import {useHistory} from "react-router-dom";
import {commitPredictions, computeCurrentPrediction, prepareTFPrediction, resetCurrentPrediction} from "../../actions";
import {addPercent, deductPercent} from "../../utils/rates";
import {round5} from "../../utils";
import moment from "moment";
import Datetime from "react-datetime";
import ComputedPrediction from "./computedPrediction";

function RatePredictionForm(props) {
    const history = useHistory();
    const store = useStore();
    const [value, setState] = useState({
        selectedRateControl: '',
        selectedTimeControl: '',
        pdcValue: 0,
        pacValue: 0,
        ddValue: 0,
        adValue: 0,
        forecast: 0,
        volatility: 0,
        rate: 0,
        currentTime: moment(),
        time: moment(),
        step: 0
    });

    useEffect(() => {
        store.dispatch(resetCurrentPrediction());
    }, [store]);

    useEffect(() => {
        if (!props.value) history.push('/rates');
    }, [props.value, history]);

    return (
        <div className="d-flex flex-column ">
            <div
                className={value.step === 0 ? 'd-flex flex-column justify-content-between block-shadowed p-3 h-300px' : 'd-none'}>
                <div className="pb-4 accent2-text">
                    <strong>Define your prediction (%)</strong>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center mr-4">
                        -
                        <input
                            min={0}
                            max={99}
                            value={value.pdcValue}
                            step="0.1"
                            type="number"
                            className="input-trans input-trans--sm input-trans--mx text-center"
                            onChange={(event) => setState({
                                ...value,
                                pacValue: 0,
                                pdcValue: event.target.value,
                                selectedRateControl: 'pdc',
                                rate: deductPercent(props.value, parseFloat(event.target.value))
                            })}/> %
                    </div>

                    <button className="btn-icon"
                            onClick={() => setState({
                                ...value,
                                pdcValue: 0.5,
                                pacValue: 0,
                                selectedRateControl: 'pd05',
                                rate: deductPercent(props.value, 0.5)
                            })}>
                        - 0.5%
                    </button>

                    <button className="btn-icon"
                            onClick={() => setState({
                                ...value,
                                pdcValue: 1,
                                pacValue: 0,
                                selectedRateControl: 'pd1',
                                rate: deductPercent(props.value, 1)
                            })}>
                        - 1%
                    </button>

                    <button className="btn-icon"
                            onClick={() => setState({
                                ...value,
                                pdcValue: 1.5,
                                pacValue: 0,
                                selectedRateControl: 'pd15',
                                rate: deductPercent(props.value, 1.5)
                            })}>
                        - 1.5%
                    </button>

                </div>

                <div className="mt-4 d-flex align-items-center">

                    <div className="d-flex align-items-center mr-4">
                        +
                        <input
                            min={0}
                            max={99}
                            value={value.pacValue}
                            step="0.1"
                            type="number"
                            className="input-trans input-trans--sm input-trans--mx text-center"
                            onChange={(event) => setState({
                                ...value,
                                pdcValue: 0,
                                pacValue: event.target.value,
                                selectedRateControl: 'pac',
                                rate: addPercent(props.value, parseFloat(event.target.value))
                            })}/>%
                    </div>

                    <button className="btn-icon"
                            onClick={() => setState({
                                ...value,
                                pdcValue: 0,
                                pacValue: 0.5,
                                selectedRateControl: 'pa05',
                                rate: addPercent(props.value, 0.5)
                            })}>
                        + 0.5%
                    </button>

                    <button className="btn-icon"
                            onClick={() => setState({
                                ...value,
                                pdcValue: 0,
                                pacValue: 1,
                                selectedRateControl: 'pa1',
                                rate: addPercent(props.value, 1)
                            })}>
                        + 1%
                    </button>

                    <button className="btn-icon"
                            onClick={() => setState({
                                ...value,
                                pdcValue: 0,
                                pacValue: 1.5,
                                selectedRateControl: 'pa15',
                                rate: addPercent(props.value, 1.5)
                            })}>
                        + 1.5%
                    </button>
                </div>

                <div className="d-flex align-items-center mt-4 pt-4 border-top">
                    <label
                        htmlFor="customRate"
                        className="mr-4 accent2-text text-small">
                        <strong>Or type custom rate</strong>
                    </label>
                    <input
                        id="customRate"
                        className="flex-2 input-trans ml-4"
                        step="0.00001"
                        type="number"
                        placeholder={value.rate || props.value}
                        value={round5(value.rate || props.value)}
                        onChange={(event) => setState({
                            ...value,
                            pdcValue: 0,
                            pacValue: 0,
                            rate: parseFloat(event.target.value),
                            selectedRateControl: 'cr'
                        })}/>
                </div>

                <div className="mt-3 d-flex w-100">
                    <button className="btn btn-primary mt-5 ml-auto"
                            onClick={() => setState({
                                ...value,
                                step: 1
                            })}>
                        Continue
                    </button>
                </div>
            </div>
            <div className={value.step === 1 ? 'd-flex flex-column justify-content-between  h-300px' : 'd-none'}>
                <div className="d-flex flex-column block-shadowed p-3 ">

                    <div className="pb-4 accent2-text">
                        <strong>Set verification delay from now</strong>
                    </div>

                    <div className="d-flex align-items-center ">
                        <div className="d-flex align-items-center mr-4">
                            +
                            <select className="select-trans select-trans--sm select-trans--mx"
                                    value={value.adValue}
                                    onChange={(ev) => setState({
                                        ...value,
                                        adValue: ev.target.value,
                                        time: value.currentTime.clone().add(parseInt(ev.target.value, 10), 'days')
                                    })}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>7</option>
                                <option>14</option>
                                <option>30</option>
                            </select>
                            day(s)
                        </div>

                        <div className="d-flex align-items-center ml-4">
                            +
                            <select className="select-trans select-trans--sm select-trans--mx"
                                    value={value.ahValue}
                                    onChange={(ev) => setState({
                                        ...value,
                                        ahValue: ev.target.value,
                                        time: value.currentTime.clone()
                                            .add(parseInt(ev.target.value, 10), 'hours')
                                    })}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>6</option>
                                <option>12</option>
                            </select>
                            hour(s)
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center mt-4 block-shadowed p-3 ">
                    <label
                        htmlFor="customRate"
                        className="text-small accent2-text mr-4">
                        <strong>Or select date</strong>
                    </label>

                    <Datetime
                        defaultValue={value.time}
                        onChange={(date) => setState({
                            ...value,
                            time: moment(date)
                        })}/>
                </div>

                <div className="d-flex justify-content-between w-100 mt-2 px-3">
                    <button className="btn btn-secondary"
                        onClick={() => setState({
                            ...value,
                            step: 0
                        })}>
                            Back to value
                    </button>

                    <button className="btn btn-primary ml-auto"
                        onClick={() => setState({
                            ...value,
                            step: 2
                        })}>
                        Configure and finish
                    </button>
                </div>
            </div>
            <div
                className={value.step === 2 ? 'd-flex flex-column justify-content-between block-shadowed p-3 h-250px' : 'd-none'}>
                <div className="">
                    <div className="d-flex align-items-center">
                        <label
                            htmlFor="forecast"
                            className=" mr-4">
                            Forecast
                        </label>

                        <select id="forecast"
                            className="w-100 select-trans select-trans--mx"
                            value={value.forecast}
                            onChange={(ev) => setState({
                                ...value,
                                forecast: parseInt(ev.target.value, 10),
                            })}>

                                <option value={0}>W/O forecast</option>
                                <option value={-1}>Decrease, primary source</option>
                                <option value={-2}>Decrease, secondary source</option>
                                <option value={-3}>Decrease, tertiary source</option>
                                <option value={1}>Increase, primary source</option>
                                <option value={2}>Increase, secondary source</option>
                                <option value={3}>Increase, tertiary source</option>
                        </select>

                    </div>

                    <div className="mt-4 d-flex align-items-center">
                        <label
                            htmlFor="volatility"
                            className=" mr-4">
                            Volatility points
                        </label>

                        <select id="volatility"
                                className="w-100 select-trans select-trans--mx"
                                value={value.volatility}
                                onChange={(ev) => setState({
                                    ...value,
                                    volatility: parseInt(ev.target.value, 10),
                                })}>
                            <option value={0}>Default</option>
                            <option value={1}>10 points</option>
                            <option value={2}>25 points</option>
                            <option value={3}>50 points</option>
                            <option value={4}>75 points</option>
                            <option value={5}>100+ points</option>
                        </select>

                    </div>
                </div>

                <div className="my-5">
                    <div>
                        <label className="text-gray text-small">Prediction date:</label>
                        <span className="accent2-text">{value.time.format('LLL')}</span>
                    </div>
                    <div>
                        <label className="text-gray text-small">Prediction rate:</label>
                        <span className="accent-bg-text">
                            <strong>{round5(value.rate || props.value)}</strong>,
                            {value.rate ? round5(props.value - value.rate) + ' from origin ' : ' Equal to origin '}
                        </span>
                    </div>
                </div>

                <div className="d-flex align-items-center mt-3 mb-5">
                    <label className="text-gray text-small pr-3">
                        Estimated rate based on previous verifications:
                    </label>

                    <ComputedPrediction
                        current={props.current}
                        prepare={() => store.dispatch(prepareTFPrediction({
                            pair: props.pairs.join('/')
                        }))}
                        compute={() => store.dispatch(computeCurrentPrediction({
                            pair: props.pairs.join('/'),
                            volatility: value.volatility,
                            forecast: value.forecast,
                            realRate: props.value,
                            predRate: value.rate || props.value
                        }))}
                    />
                </div>

                <div className="d-flex justify-content-between w-100">
                    <button className="btn btn-secondary "
                        onClick={() => setState({
                            ...value,
                            step: 1
                        })}>
                            Back to date
                    </button>

                    <button
                        className="btn btn-primary"
                        disabled={!(value.rate || props.value)}
                        onClick={() => store.dispatch(commitPredictions({
                            pair: props.pairs.join('/'),
                            realRate: props.value,
                            predRate: value.rate || props.value,
                            volatility: value.volatility,
                            forecast: value.forecast,
                            time: value.time.valueOf()
                        }, history))}>
                        Submit prediction
                    </button>
                </div>
            </div>


        </div>
    )
}

export default RatePredictionForm;

CurrenciesRate.propTypes = {
    current: PropTypes.object,
    pairs: PropTypes.array,
    value: PropTypes.number,
};



