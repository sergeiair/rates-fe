import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {
    getInitialPredAvgRiseChange,
    getInitialVerifAvgRiseChange,
    round4
} from "../../utils";

import riseChartImage from '../../assets/rise-chart.svg';
import fallChartImage from '../../assets/fall-chart.svg';

function PredictionsStats(props) {
    const [value, setState] = useState({
        risePreds: [],
        fallPreds: []
    });


    useEffect(() => {
        setState(state => ({
            risePreds: props.data.filter((pred) => pred.realRate < pred.predRate),
            fallPreds: props.data.filter((pred) => pred.realRate >= pred.predRate)
        }));
    }, [props.data]);


    return (
        <div className="d-flex align-items-center justify-content-center mt-3">
            <div className="d-flex flex-column align-items-center m-3 p-3 block">
                <img alt="" className="image-80" src={riseChartImage}/>
                <h1 className="accent2-text">{value.risePreds.length}</h1>
            </div>
            <div className="d-flex flex-column align-items-center m-3 p-3 block">
                <img alt="" className="image-80" src={fallChartImage}/>
                <h1 className="accent2-text">{value.fallPreds.length}</h1>
            </div>

            <div className="d-flex flex-column ">
                <div className="d-flex flex-column align-items-center mx-3 mb-2 p-3 block">
                    <span className="text-small text-gray">
                        Average rate change from <strong>initial market value</strong> to <strong>predicted</strong>
                    </span>
                    <span className="accent2-text">
                        { round4(getInitialPredAvgRiseChange(value.risePreds)) }
                    </span>
                </div>

                <div className="d-flex flex-column align-items-center mx-3 mt-2 p-3 block">
                    <span className="text-small text-gray">
                        Average rate change from <strong>initial market value</strong> to <strong>verified</strong>
                    </span>
                    <span className="accent2-text">
                        { round4(getInitialVerifAvgRiseChange(value.risePreds)) }
                    </span>
                </div>
            </div>

        </div>
    )
}

PredictionsStats.propTypes = {
    data: PropTypes.array
};

export default PredictionsStats;




