import React, {createRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useStore} from "react-redux";
import {requestPredictions, setPredictionsFilter, verifyPrediction} from "../../actions";
import {getFilteredPredictions, isPredCompleted, isPredSuccessful, round4} from "../../utils";
import moment from "moment";
import paginated from "../../hocs/logProps";
import TablePagination from "../helpers/tablePagination";
import uniqBy from "ramda/src/uniqBy";


function PredictionsList(props) {
    const tableRef = createRef();
    const store = useStore();
    const predictions = getFilteredPredictions(props.values, props.filter, props.pair);
    const itemsNumber = predictions.length;
    const volatility = [
        '10 pts',
        '25 pts',
        '50 pts',
        '75 pts',
        '100+ pts'
    ];

    useEffect(() => {
        store.dispatch(requestPredictions());
    }, []);

    useEffect(() => {}, [itemsNumber, props.filter, props.pair]);

    return (
        <>
            <div className="d-flex align-items-center p-3 block-shadowed">
                <div className="d-flex align-items-center">
                    <select className={`select-tiny accent2-text as-button mr-3`}
                        onChange={(ev) => store.dispatch(setPredictionsFilter({name: 'pair', value: ev.target.value}))}>
                            <option value="">All pairs</option>
                            {
                                uniqBy(({ pair }) => pair, props.values)
                                    .map((item, i) =>
                                        <option key={item.pair + i}>{item.pair}</option>
                                    )
                            }
                    </select>
                </div>

                <div className="ml-5 mr-2 text-small text-gray">Filter: </div>

                <button className={`px-2 btn btn-trans accent2-text  ${
                    !props.filter ? 'text-strong' : ''}`}
                        onClick={() => store.dispatch(setPredictionsFilter({name: 'filter', value: ''}))}>
                    All
                </button>

                <button className={`px-2 btn btn-trans accent2-text  ${
                    props.filter === 'successful' ? 'text-strong' : ''}`}
                    onClick={() => store.dispatch(setPredictionsFilter({name: 'filter', value: 'successful'}))}>
                        Successful
                </button>

                <button className={`px-2 btn btn-trans alert-text  ${
                    props.filter === 'unsuccessful' ? 'text-strong' : ''}`}
                    onClick={() => store.dispatch(setPredictionsFilter({name: 'filter', value: 'unsuccessful'}))}>
                        Unsuccessful
                </button>

            </div>

            <table ref={tableRef}
                className="table text-small block p-2 mt-4">
                    <thead>
                        <tr>
                            <th>Pair</th>
                            <th>Initial market rate</th>
                            <th>Prediction rate</th>
                            <th>Verification rate</th>
                            <th className="text-strong">Initial - Prediction</th>
                            <th className="text-strong">Initial - Verified</th>
                            <th>Forecast</th>
                            <th>Volatility</th>
                            <th>Verification planned</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        predictions.map((value, index) => {
                            return <tr key={index + value.id}
                                className={!isPredSuccessful(value) && isPredCompleted(value) ? 'alert-dark-text' : ''}>
                                    <td>{value.pair}</td>
                                    <td>{round4(value.realRate)}</td>
                                    <td>{round4(value.predRate)}</td>
                                    <td>{!!value.finalRate ? round4(value.finalRate) : 'n/a'}</td>
                                    <td className="text-strong">{round4(value.realRate - value.predRate)}</td>
                                    <td className="text-strong">{!!value.finalRate ? round4(value.realRate - value.finalRate) : 'n/a'}</td>
                                    <td>{value.forecast}</td>
                                    <td>{volatility[value.volatility]}</td>
                                    <td><small>{moment(value.time).format('lll')}</small></td>
                                    <td>
                                        {!!value.finalRate
                                            ? <small>Done {moment(value.verifyTime).format('lll')}</small>
                                            : <button className="bg-transparent border-0 p-0 accent2-text underlined text-strong"
                                                onClick={() => store.dispatch(verifyPrediction({id: value.id}))}>
                                                    Verify now
                                              </button>
                                        }
                                    </td>
                            </tr>
                        })
                    }
                    </tbody>
            </table>

            <TablePagination tableNode={tableRef} itemsNumber={itemsNumber}/>
        </>
    )
}

PredictionsList.propTypes = {
    values: PropTypes.array,
    pair: PropTypes.string,
    filter: PropTypes.string
};

export default paginated(PredictionsList);




