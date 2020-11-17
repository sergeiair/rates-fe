import React, {createRef, useEffect} from 'react';
import {requestRates} from "../../actions";
import {useStore} from "react-redux";


function FetchRatesForm() {
    const store = useStore();
    const allCurrencies = ['EUR', 'NOK', 'GBP', 'RUB', 'CHF', 'PLN'];
    const selectRef = createRef();

    useEffect(() => {
        store.dispatch(requestRates({
            curr1: 'USD',
            curr2: selectRef.current.value
        }));
    }, [selectRef, store]);

    return (
        <div className="d-flex flex-column align-items-center ">
            <div className="py-3">Select second currency</div>
            <div className="d-flex align-items-center block-shadowed p-2">
                <select
                    disabled={true}
                    className="select-trans w-100 px-4">
                    <option>USD</option>
                </select>

                <div className="px-4"> / </div>

                <select ref={selectRef}
                        className="select-trans w-100 px-4 as-button"
                        onChange={() => store.dispatch(requestRates({
                            curr1: 'USD',
                            curr2: selectRef.current.value
                        }))}>
                    {
                        allCurrencies.map((curr) =>
                            <option key={curr}>{curr}</option>)
                    }
                </select>

            </div>
        </div>
    );
}

export const FetchRatesFormMemorized = React.memo(FetchRatesForm);

