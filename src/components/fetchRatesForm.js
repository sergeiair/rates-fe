import React, {createRef, useEffect} from 'react';
import {requestRates} from "../actions";
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
    }, []);

  return (
    <>
      <form className="">
        <input
            type="string"
            id="curr1"
            className="input-trans w-100"
            placeholder="First currency"
            required=""
            autoFocus=""
            disabled={true}
            defaultValue={'USD'}/>

            <select ref={selectRef}
                className="select-trans w-100 mt-4"
                onChange={() => store.dispatch(requestRates({
                    curr1: 'USD',
                    curr2: selectRef.current.value
                }))}>
                    {
                        allCurrencies.map((curr) =>
                            <option key={curr}>{curr}</option>)
                    }
            </select>
      </form>
    </>
  );
}

export const FetchRatesFormMemorized = React.memo(FetchRatesForm);

