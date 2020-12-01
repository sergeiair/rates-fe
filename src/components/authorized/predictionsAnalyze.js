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
        if (props.data.pairs.length && props.data.preds.length) {
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
            <div className="d-flex flex-column align-items-center justify-content-center block-shadowed p-3">
                <div className="d-flex align-items-center mb-3">
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
                                className={`btn btn-trans ${value.pair === pair ? 'text-strong' : 'text-gray'} `}
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




