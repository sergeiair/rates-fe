import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {
    getInitialPredAvgFallChange,
    getInitialPredAvgRiseChange,
    getInitialVerifAvgFallChange,
    getInitialVerifAvgRiseChange, round5
} from "../../utils";

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

        <div className="d-flex align-items-center justify-content-center">
            <div className="alert alert-success p-3 rounded-circle">
                <div>
                    Rate rise predictions {value.risePreds.length}
                </div>
                <div>
                    Average rate change from initial value to verification
                    { round5(getInitialVerifAvgRiseChange(value.risePreds)) }
                </div>
                <div>
                    Average rate change from initial value to prediction
                    { round5(getInitialPredAvgRiseChange(value.risePreds)) }
                </div>
            </div>
            <div className="alert alert-info p-3 rounded-circle">
                <div>
                    Rate fall predictions {value.fallPreds.length}
                </div>
                <div>
                    Average rate change from initial value to verification
                    { round5(getInitialVerifAvgFallChange(value.fallPreds)) }
                </div>
                <div>
                    Average rate change from initial value to prediction
                    { round5(getInitialPredAvgFallChange(value.fallPreds)) }
                </div>
            </div>
        </div>
    )
}

PredictionsStats.propTypes = {
    data: PropTypes.array
};

export default PredictionsStats;




