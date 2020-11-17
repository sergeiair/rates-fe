import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {round5} from "../../utils";


function ComputedPrediction(props) {
    const status = props.current.status;

    useEffect(() => {
        if (status === 'trainingDone') {
            props.compute();
        }
    }, [status]);

    switch (status) {
        case "pending":
            return <strong className="underlined accent2-text as-button"
                onClick={() => props.prepare()}>
                    Train model
            </strong>;
        case "preparing":
            return <strong className="underlined accent2-text">
                Analyzing your history...
            </strong>;
        case "trainingDone":
            return <strong className="underlined accent2-text">
                Ready
            </strong>;
        case "empty":
            return <strong className="underlined accent2-text">
                More predictions needed
            </strong>;
        default:
            return (
                <strong className="underlined accent2-text">
                    {
                        props.current.value
                            ? round5(props.current.value)
                            : 'More predictions needed'
                    }
                </strong>
            )
    }
}

ComputedPrediction.propTypes = {
    current: PropTypes.object,
    prepare: PropTypes.func,
    compute: PropTypes.func
};

export default ComputedPrediction;




