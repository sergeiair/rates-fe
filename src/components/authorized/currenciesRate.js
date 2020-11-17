import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

function CurrenciesRate(props) {

    if (!props.value) {
        return <div className="w-100 d-flex align-items-center justify-content-center p-2 accent2-text bg-white">
            Select second currency
        </div>
    } else {
        return <div className="w-100 d-flex align-items-center justify-content-center p-2 accent2-text bg-white">
            <strong>{props.pairs.join('/')} - {props.value}&nbsp;</strong> by { moment(props.time).calendar() }
        </div>
    }
}

CurrenciesRate.propTypes = {
    time: PropTypes.string,
    value: PropTypes.number,
    pairs: PropTypes.array
};

export default CurrenciesRate;




