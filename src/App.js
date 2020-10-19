import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Portal from "./portals/portal";
import CurrenciesPrediction from "./components/currenciesPrediction";
import CurrenciesRate from "./components/currenciesRate";
import PredictionsList from "./components/predictionsList";
import Settings from "./components/settings";
import {round5} from "./utils";
import ReviewRates from "./components/reviewRates";
import PredictionsAnalyze from "./components/predictionsAnalyze";

function App(props) {
    return (
        <BrowserRouter >

            <nav className="fixed-top bg-dark p-4">
                <ul className="nav nav-pills nav-justified">
                    <li className="nav-item">
                        <Link className={'text-light'} to="/">1. Fetch rates</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={'text-light'} to="/submit">2. Submit</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={'text-light'} to="/review">3. Review</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={'text-light'} to="/analyze">4. Analyze</Link>
                    </li>
                </ul>
            </nav>

            <div className="container column-center py-5">
                <Switch>
                    <Route exact path="/settings">
                        <Settings schedulerStatuses={props.schedulers}/>
                    </Route>
                    <Route exact path="/">
                        <ReviewRates
                            data={props.history}
                            pairs={props.pairs}/>
                    </Route>
                    <Route exact path="/submit">
                        <CurrenciesPrediction
                            pairs={props.pairs}
                            value={props.rate}/>
                    </Route>
                    <Route exact path="/review">
                        <PredictionsList
                            values={props.predictions}/>
                    </Route>
                    <Route exact path="/analyze">
                        <PredictionsAnalyze
                            values={props.predictions}/>
                    </Route>
                </Switch>
                <Portal>
                    <CurrenciesRate
                        time={props.lastRatesCheckTime}
                        pairs={props.pairs}
                        value={props.rate} />
                </Portal>
            </div>
        </BrowserRouter>
    )
}


export default connect(
    (state) => ({
        pairs: [state.rates.base, state.rates.target],
        rate: round5(state.rates[state.rates.target]) || 0,
        lastRatesCheckTime: state.rates.time || '',
        predictions: state.predictions,
        schedulers: state.schedulers,
        history: state.history
    })
)(App);
