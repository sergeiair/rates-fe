import React, {useEffect, useState} from 'react';
import {useStore} from "react-redux";
import {recomputePredictions} from "../../actions";
import PropTypes from "prop-types";
import PredictionsBarChart from "./predictionsBarChart";
import PredictionsGraph from "./predictionsGraph";
import PredictionsStats from "./predictionsStats";
import Datetime from 'react-datetime';
import moment from "moment";


function PredictionsAnalyze(props) {
    const store = useStore();
    const [value, setState] = useState({
        preds: [],
        pair: null,
        datesRange: [moment().subtract(1, 'months'), moment()]
    });

    useEffect(() => {
        store.dispatch(recomputePredictions({
            dateStart: value.datesRange[0].valueOf(),
            dateEnd: value.datesRange[1].valueOf()
        }));
    }, [store, value.datesRange]);

    useEffect(() => {
        if (props.data.pairs.length && !value.pair) {
            setState({
                ...value,
                pair: props.data.pairs[0],
                preds: props.data.preds.filter(item => item.pair === props.data.pairs[0]),
            })
        } else {
            setState({
                ...value,
                pair: null,
                preds: [],
            })
        }
    }, [props.data.pairs, props.data.preds]);

    return (

        <>
            <div className="d-flex align-items-center">
                <Datetime
                    onChange={date => setState({
                        ...value,
                        datesRange: [date, value.datesRange[1]]
                    })}
                    initialValue={value.datesRange[0]}
                />
                <Datetime
                    onChange={date => setState({
                        ...value,
                        datesRange: [value.datesRange[0], date]
                    })}
                    initialValue={value.datesRange[1]}
                />
            </div>

            <div className="d-flex align-items-center">
                {
                    props.data.pairs.map((pair, i) => (
                        <button key={pair + i}
                            className="btn btn-trans"
                            onClick={_ => setState({
                                ...value,
                                pair: pair,
                                preds: props.data.preds.filter(item => item.pair === pair),
                            })}>
                                {pair}
                        </button>
                    ))
                }
            </div>
            <PredictionsStats data={value.preds}/>
            <PredictionsGraph data={value.preds}/>
            <PredictionsBarChart data={value.preds}/>
        </>
    )
}

PredictionsAnalyze.propTypes = {
    data: PropTypes.object
};

export default PredictionsAnalyze;




