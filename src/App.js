import React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Portal from "./portals/portal";
import CurrenciesPrediction from "./components/authorized/currenciesPrediction";
import CurrenciesRate from "./components/authorized/currenciesRate";
import PredictionsList from "./components/authorized/predictionsList";
import Settings from "./components/authorized/settings";
import {round5} from "./utils";
import ReviewRates from "./components/authorized/reviewRates";
import PredictionsAnalyze from "./components/authorized/predictionsAnalyze";
import Landing from "./components/landing/landing";
import AuthGuard from "./components/helpers/authGuard";

function App(props) {
    return (
        <BrowserRouter >
            <Landing/>

            <AuthGuard>
                <div id="portal-root"
                    className="fixed-top d-flex align-items-center justify-content-center bg-warning portal-root" />

                <nav className="fixed-top bg-dark p-4">
                    <ul className="nav nav-pills nav-justified">
                        <li className="nav-item">
                            <Link className={'text-light'} to="/rates">1. Fetch rates</Link>
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
                        <Route exact path="/rates">
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
            </AuthGuard>

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
        history: state.history,
        user: state.user
    })
)(App);
