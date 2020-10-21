import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useStore} from "react-redux";
import {requestPredictions} from "../../actions";
import {round5} from "../../utils";
import moment from "moment";

function PredictionsList(props) {
    const store = useStore();
    const volatility = ['Low', 'Medium', 'High'];
    useEffect(() => {
        store.dispatch(requestPredictions());
    }, [store]);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Pair</th>
                    <th>Initial real rate</th>
                    <th>Prediction rate</th>
                    <th>IRR / Prediction (%)</th>
                    <th>Verification rate</th>
                    <th>VR / Prediction (%)</th>
                    <th>IRR / VR (%)</th>
                    <th>Forecast</th>
                    <th>Volatility</th>
                    <th>Created</th>
                    <th>Verified</th>
                </tr>
            </thead>
            <tbody>
            {
                props.values.map((value, index) => {
                    const irrPred = (value.realRate / value.predRate) * 100;
                    const irrPredPerc = 100 > irrPred ?
                        `+ ${round5(100 - irrPred )}` :
                        `- ${round5(irrPred - 100)}`;
                    const finalPred = (value.finalRate / value.predRate) * 100;
                    const finalPredPerc = 100 > finalPred ?
                        `+ ${round5(100 - finalPred )}` :
                        `- ${round5(finalPred - 100)}`;

                    return <tr key={index}>
                        <td>{value.pair}</td>
                        <td>{round5(value.realRate)}</td>
                        <td>{round5(value.predRate)}</td>
                        <td>{value.realRate === value.predRate ? 'equal' : irrPredPerc}</td>
                        <td>{round5(value.finalRate)}</td>
                        <td>{value.finalRate === value.predRate ? 'equal' : finalPredPerc}</td>
                        <td>{round5((irrPred / finalPred) * 100)}</td>
                        <td>{value.forecast}</td>
                        <td>{volatility[value.volatility]}</td>
                        <td><small>{moment(value.time).format('LLL')}</small></td>
                        <td><small>{moment(value.verifyTime).format('LLL')}</small></td>
                    </tr>
                })
            }
            </tbody>
        </table>
    )
}

PredictionsList.propTypes = {
    values: PropTypes.array
};

export default PredictionsList;




