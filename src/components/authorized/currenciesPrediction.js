import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import CurrenciesRate from "./currenciesRate";
import {useStore} from "react-redux";
import {useHistory} from "react-router-dom";
import {commitPredictions, computeCurrentPrediction} from "../../actions";
import {addPercent, deductPercent} from "../../utils/rates";
import {round5} from "../../utils";
import moment from "moment";
import {useDebouncedEffect} from "../../hooks/debouncedEffect";

function CurrenciesPrediction(props) {
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
        time: moment()
    });

    useEffect(() => {
        if (!props.value) history.push('/rates');
    }, [props.value, history]);

    useDebouncedEffect(() => {
        if (Math.abs(value.rate)) {
            store.dispatch(computeCurrentPrediction({
                pair: props.pairs.join('/'),
                volatility: value.volatility,
                forecast: value.forecast,
                realRate: props.value,
                predRate: value.rate
            }))
        }
    }, 500, [
        value.rate,
        value.volatility,
        value.forecast
    ]);

    return (
        <div className="d-flex flex-column ">
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center mr-4">
                    <i className="fa fa-minus"></i>
                    <input
                        min={0}
                        max={99}
                        value={value.pdcValue}
                        step="0.1"
                        type="number"
                        className="input-trans input-trans--sm input-trans--mx"
                        onChange={(event) => setState({
                            ...value,
                            pacValue: 0,
                            pdcValue: event.target.value,
                            selectedRateControl: 'pdc',
                            rate: deductPercent(props.value, parseFloat(event.target.value))
                        })} /> %
                </div>

                <button className="btn-icon"
                    onClick={() => setState({
                        ...value,
                        pdcValue: 1,
                        pacValue: 0,
                        selectedRateControl: 'pd1',
                        rate: deductPercent(props.value, 1)
                    })}>
                        <i className="fa fa-minus"></i> 1%
                </button>

                <button className="btn-icon"
                    onClick={() => setState({
                        ...value,
                        pdcValue: 3,
                        pacValue: 0,
                        selectedRateControl: 'pd3',
                        rate: deductPercent(props.value, 3)
                    })}>
                    <i className="fa fa-minus"></i> 3%
                </button>

                <button className="btn-icon"
                    onClick={() => setState({
                        ...value,
                        pdcValue: 5,
                        pacValue: 0,
                        selectedRateControl: 'pd5',
                        rate: deductPercent(props.value, 5)
                    })}>
                        <i className="fa fa-minus"></i> 5%
                </button>

            </div>

            <div className="mt-4 d-flex align-items-center">

                <div className="d-flex align-items-center mr-4">
                    <i className="fa fa-plus"></i>
                    <input
                        min={0}
                        max={99}
                        value={value.pacValue}
                        step="0.1"
                        type="number"
                        className="input-trans input-trans--sm input-trans--mx"
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
                        pacValue: 1,
                        selectedRateControl: 'pa1',
                        rate: addPercent(props.value, 1)
                    })}>
                        <i className="fa fa-plus"></i> 1%
                </button>

                <button className="btn-icon"
                    onClick={() => setState({
                        ...value,
                        pdcValue: 0,
                        pacValue: 3,
                        selectedRateControl: 'pa3',
                        rate: addPercent(props.value, 3)
                    })}>
                        <i className="fa fa-plus"></i> 3%
                </button>

                <button className="btn-icon"
                    onClick={() => setState({
                        ...value,
                        pdcValue: 0,
                        pacValue: 5,
                        selectedRateControl: 'pa5',
                        rate: addPercent(props.value, 5)
                    })}>
                        <i className="fa fa-plus"></i> 5%
                </button>

            </div>

            <div className="my-4 w-100 text-center">Or custom rate</div>

            <div className="d-flex align-items-center">
                <label
                    htmlFor="customRate"
                    className=" mr-4">
                        Your value
                </label>
                <input
                    id="customRate"
                    className="flex-2 input-trans ml-4"
                    step="0.00001"
                    type="number"
                    placeholder={value.rate || props.value}
                    defaultValue={value.rate || props.value}
                    onChange={(event) => setState({
                        ...value,
                        pdcValue: 0,
                        pacValue: 0,
                        rate: parseFloat(event.target.value),
                        selectedRateControl: 'cr'
                    })} />
            </div>

            <div className="d-flex flex-column mt-5 pt-5 border-top">

                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center mr-4">
                        <i className="fa fa-plus"></i>
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
                        <i className="fa fa-plus"></i>
                        <select className="select-trans select-trans--sm select-trans--mx"
                            value={value.ahValue}
                            onChange={(ev) => setState({
                                ...value,
                                ahValue: ev.target.value,
                                time: value.currentTime.clone().add(parseInt(ev.target.value, 10), 'hours')
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

                <div className="my-4 w-100 text-center">Or custom date</div>

                <div className="d-flex align-items-center">
                    <label
                        htmlFor="customRate"
                        className=" mr-4">
                            Your value
                    </label>

                    <input
                        id="customDate"
                        className="flex-2 input-trans ml-4"
                        type="datetime-local"
                        onChange={(event) => setState({
                            ...value,
                            rate: value.rate,
                            time: moment(event.target.value)
                        })}/>
                </div>
            </div>

            <div className="mt-5 pt-5 border-top">
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
                    <span className="pr-3">Prediction date:</span>
                    {value.time.format('LLL')}
                </div>
                <div>
                    <span className="pr-3">Prediction rate:</span>
                    {round5(value.rate || props.value)} ({value.rate ? round5(props.value - value.rate) : '='})
                </div>
            </div>


            <button
                type="button"
                className="mt-3 btn btn-block btn-info"
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
    )
}

export default CurrenciesPrediction;

CurrenciesRate.propTypes = {
    pairs: PropTypes.array,
    value: PropTypes.number,
};



