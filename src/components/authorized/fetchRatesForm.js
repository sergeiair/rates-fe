import React, {createRef, useEffect, useState} from 'react';
import {requestRates} from "../../actions";
import {useStore} from "react-redux";


function FetchRatesForm() {
    const pairs = [
        'EUR/USD', 'EUR/PLN', 'EUR/CHF', 'EUR/GBP',
        'USD/NOK', 'GBP/USD', 'USD/RUB', 'USD/CHF', 'USD/PLN', 'USD/JPY'
    ];
    const store = useStore();
    const [value, setState] = useState({
        pair: 'EUR/USD'
    });

    useEffect(() => {
        const [curr1, curr2] = value.pair.split('/');

        store.dispatch(requestRates({base: curr1, target: curr2}));
    }, [value.pair]);

    return (
        <div className="d-flex flex-column align-items-center ">
            <div className="py-3">Pick the pair</div>

            <div className="d-flex align-items-center justify-content-center flex-wrap px-2 mx-0 px-md-5 mx-md-5">
                {
                    pairs.map((pair) => (
                        <button key={pair}
                            className={`shadowed p-2 mx-1 mb-2 ${value.pair === pair ? 'btn-accent-2' : 'btn-lightest'}`}
                            onClick={(e) => setState({pair: e.target.innerText})}>
                                <small>{pair}</small>
                        </button>
                    ))
                }
            </div>
        </div>
    );
}

export const FetchRatesFormMemorized = React.memo(FetchRatesForm);

