import React from 'react';
import {loadedData, PredictionsTFService} from "../../utils/predictionsTFService";


function PredictionsAnalyze(props) {
    const service = new PredictionsTFService();
        service.init(loadedData);
        service.getResult([1, 3, 1.0, 1.1], 500).then(console.log);

    return (

        <></>
    )
}

PredictionsAnalyze.propTypes = {

};

export default PredictionsAnalyze;




