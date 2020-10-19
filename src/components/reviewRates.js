import React, {useEffect, useState} from 'react';
import {useStore} from "react-redux";
import PropTypes from "prop-types";

import {requestHistory} from "../actions";
import {FetchRatesFormMemorized} from "./fetchRatesForm";
import PairGraph from "./pairGraph";

function ReviewRates(props) {
    const store = useStore();
    const [params] = useState({
        base: 'USD',
        limit: 225
    });

    useEffect(() => {
        store.dispatch(requestHistory(params));
    }, [store, props.pairs[1]]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <FetchRatesFormMemorized/>
            <PairGraph
                data={props.data}
                pairs={props.pairs}/>
        </div>
    );
}

ReviewRates.propTypes = {
    data: PropTypes.array,
    pairs: PropTypes.array
};

export default ReviewRates;
