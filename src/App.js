import React, {useEffect} from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {connect, useStore} from "react-redux";
import CurrenciesPrediction from "./components/authorized/currenciesPrediction";
import PredictionsList from "./components/authorized/predictionsList";
import Settings from "./components/authorized/settings";
import {round5} from "./utils";
import ReviewRates from "./components/authorized/reviewRates";
import PredictionsAnalyze from "./components/authorized/predictionsAnalyze";
import Landing from "./components/landing/landing";
import AuthGuard from "./components/helpers/authGuard";
import {initApp, logout} from "./actions";
import {initAuthHeaders} from "./sagas";
import {SessionStorage} from "./utils/sessionStorage";

function App(props) {
    const store = useStore();

    useEffect(() => {
        store.dispatch(initApp());
        initAuthHeaders(SessionStorage.token);
    }, [store]);

    return (
        <BrowserRouter >
            {
                !props.user.token  ? <Landing/>  :
                <AuthGuard auth={/*props.user.email && */!!props.user.token}>
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

                        <button className="h-100 btn-trans px-3 absolute-right-top"
                            onClick={() => store.dispatch(logout())}>
                                <i className="fa fa-sign-out text-white "/>
                        </button>

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
                                    data={props.analyze}/>
                            </Route>
                        </Switch>
                        {/*<Portal>
                            <CurrenciesRate
                                time={props.lastRatesCheckTime}
                                pairs={props.pairs}
                                value={props.rate} />
                        </Portal>*/}
                    </div>
                </AuthGuard>
            }
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
        analyze: state.analyze,
        user: state.user
    })
)(App);
