import React, {useEffect} from 'react';
import {useStore} from "react-redux";
import {checkSchedulersState, enableScheduler} from "../actions";

import offImage from '../assets/off.svg';
import onImage from '../assets/on.svg';
import PropTypes from "prop-types";

function Settings(props) {
    const store = useStore();

    useEffect(() => {
        store.dispatch(checkSchedulersState());
    }, [store]);

    return (
        <div className="">
            <button className="btn-trans d-flex align-items-center"
                onClick={() => store.dispatch(enableScheduler({name: 'rates'}))}>
                    <span className="p-3">Rates scheduler status</span>
                    <img className="image-40" src={!props.schedulerStatuses['rates'] ? offImage : onImage}/>
            </button>

            <button className="btn-trans d-flex align-items-center mt-4"
                onClick={() => store.dispatch(enableScheduler({name: 'predictions'}))}>
                    <span className="p-3">Predictions scheduler status</span>
                    <img className="image-40" src={!props.schedulerStatuses['predictions'] ? offImage : onImage}/>
            </button>
        </div>
    )
}

Settings.propTypes = {
    schedulerStatuses: PropTypes.object,
};

export default Settings;




