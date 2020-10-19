import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

function CurrenciesRate(props) {
    return (
        <div className="p-3 text-dark">
            {
                !props.value
                    ? 'Select a second currency and get the latest rate'
                    : `${props.pairs.join('/')}: ${props.value} by ${moment(props.time).calendar()}`
            }
        </div>
    )
}

CurrenciesRate.propTypes = {
    time: PropTypes.string,
    value: PropTypes.number,
    pairs: PropTypes.array
};

export default CurrenciesRate;




