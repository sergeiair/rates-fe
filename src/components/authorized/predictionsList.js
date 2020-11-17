import React, {createRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useStore} from "react-redux";
import {requestPredictions, setPredictionsFilter} from "../../actions";
import {getFilteredPredictions, isPredCompleted, isPredSuccessful, round4} from "../../utils";
import moment from "moment";
import paginated from "../../hocs/logProps";
import TablePagination from "../helpers/tablePagination";
import uniqBy from "ramda/src/uniqBy";


function PredictionsList(props) {
    const tableRef = createRef();
    const store = useStore();
    const predictions = getFilteredPredictions(props.values, props.filter);
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

    useEffect(() => {}, [itemsNumber, props.filter.name, props.filter.value]);

    return (
        <>
            <div className="d-flex align-items-center p-3 block-shadowed">
                <div className="d-flex align-items-center">
                    <select className={`select-tiny accent2-text as-button mr-3`}
                        onChange={(ev) => store.dispatch(setPredictionsFilter({name: 'currency', value: ev.target.value}))}>
                            <option value="">Select pair</option>
                            {
                                uniqBy(({ pair }) => pair, props.values)
                                    .map((item, i) =>
                                        <option key={item.pair + i}>{item.pair}</option>
                                    )
                            }
                    </select>
                </div>

                <button className={`btn btn-trans accent2-text underlined ${
                    props.filter === 'successful' ? 'text-strong' : ''}`}
                    onClick={() => store.dispatch(setPredictionsFilter({name: 'filter', value: 'successful'}))}>
                        Show successful
                </button>

                <button className={`btn btn-trans alert-text underlined ${
                    props.filter === 'unsuccessful' ? 'text-strong' : ''}`}
                    onClick={() => store.dispatch(setPredictionsFilter({name: 'filter', value: 'unsuccessful'}))}>
                        Show unsuccessful
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
                            <th className="text-strong">Verified - Prediction</th>
                            <th>Forecast</th>
                            <th>Volatility</th>
                            <th>Created</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        predictions.map((value, index) => {
                            return <tr key={index + value.id}
                                className={!isPredSuccessful(value) && isPredCompleted(value) ? 'fail-text' : ''}>
                                    <td>{value.pair}</td>
                                    <td>{round4(value.realRate)}</td>
                                    <td>{round4(value.predRate)}</td>
                                    <td>{!!value.finalRate ? round4(value.finalRate) : 'n/a'}</td>
                                    <td className="text-strong">{round4(value.realRate - value.predRate)}</td>
                                    <td className="text-strong">{!!value.finalRate ? round4(value.realRate - value.finalRate) : 'n/a'}</td>
                                    <td>{value.forecast}</td>
                                    <td>{volatility[value.volatility]}</td>
                                    <td><small>{moment(value.time).format('lll')}</small></td>
                                    <td><small>{moment(value.verifyTime).format('lll')}</small></td>
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
    filter: PropTypes.object
};

export default paginated(PredictionsList);




