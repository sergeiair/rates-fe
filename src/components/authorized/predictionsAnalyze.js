import React, {useEffect} from 'react';
import {useStore} from "react-redux";
import {recomputePredictions} from "../../actions";


function PredictionsAnalyze(props) {
    const store = useStore();
    /*const service = new PredictionsTFService();
        service.init(loadedData);
        service.getResult([1, 3, 1.0, 1.1], 500).then(console.log);*/

    useEffect(() => {
        store.dispatch(recomputePredictions());
    }, []);

    return (

        <></>
    )
}

PredictionsAnalyze.propTypes = {

};

export default PredictionsAnalyze;




