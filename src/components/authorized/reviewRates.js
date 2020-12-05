import React, {useEffect, useState} from 'react';
import {useStore} from "react-redux";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";

import {requestHistory} from "../../actions";
import {FetchRatesFormMemorized} from "./fetchRatesForm";
import PairGraph from "./pairGraph";

function ReviewRates(props) {
    const history = useHistory();
    const store = useStore();
    const pair = props.pairs.join('/');

    useEffect(() => {
        store.dispatch(requestHistory({
            limit: 225
        }));
    }, [store, pair]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <FetchRatesFormMemorized/>

            <PairGraph
                data={props.data}
                pairs={props.pairs}/>

            <button className="btn btn-primary"
                onClick={() => history.push('/submit')}>
                    Proceed with {props.value}
            </button>
        </div>
    );
}

ReviewRates.propTypes = {
    data: PropTypes.array,
    pairs: PropTypes.array,
    value: PropTypes.number
};

export default ReviewRates;
