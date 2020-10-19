import React, {useEffect} from 'react';
import {useStore} from "react-redux";
import * as tf from '@tensorflow/tfjs'
import {loadedData, PredictionsTFService} from "../utils/predictionsTFService";


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




