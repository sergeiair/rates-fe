import React, {useEffect} from 'react';
import {BrowserRouter, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {connect, useStore} from "react-redux";
import RatePredictionForm from "./components/authorized/ratePredictionForm";
import PredictionsList from "./components/authorized/predictionsList";
import Settings from "./components/authorized/settings";
import {round4} from "./utils";
import ReviewRates from "./components/authorized/reviewRates";
import PredictionsAnalyze from "./components/authorized/predictionsAnalyze";
import Landing from "./components/landing/landing";
import AuthGuard from "./components/helpers/authGuard";
import {initApp, logout} from "./actions";
import {initAuthHeaders} from "./sagas";
import {SessionStorage} from "./utils/sessionStorage";
import CurrenciesRate from "./components/authorized/currenciesRate";
import logoutImage from './assets/logout.svg';
import logoImage from './assets/logo-sm.png';

function App(props) {
    const store = useStore();

    useEffect(() => {
        store.dispatch(initApp());
        initAuthHeaders(SessionStorage.token);
    }, [store]);

    return (
        <BrowserRouter>
            {
                !props.user.token
                    ? <Landing/>
                    : <AuthGuard auth={!!props.user.token}>
                        <nav className="fixed-top nav-main p-4">
                            <ul className="nav nav-pills nav-justified">
                                <li className="w-100px">
                                    <NavLink exact to="/rates">
                                        <img className="position-fixed"
                                             style={{
                                                 'left': '1.5rem',
                                                 'top': '.5rem'
                                             }}
                                             src={logoImage} />
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" exact to="/rates">1. Select pair</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" exact to="/submit">2. Submit prediction</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" exact to="/review">3. Review</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" exact to="/analyze">4. Analyze</NavLink>
                                </li>
                            </ul>

                            <button className="h-100 btn-trans px-3 absolute-right-top"
                                onClick={() => store.dispatch(logout())}>
                                    <img className="w-20px as-button" src={logoutImage} />
                            </button>
                        </nav>

                    <div className="fixed-top"
                        style={{'top': '73px'}}>
                            <CurrenciesRate
                                time={props.lastRatesCheckTime}
                                pairs={props.pairs}
                                value={props.rate} />
                    </div>

                    <div className="container column-center py-3 root">
                        <Switch>
                            <Redirect exact from="/" to="rates" />
                            <Route exact path="/settings">
                                <Settings schedulerStatuses={props.schedulers}/>
                            </Route>
                            <Route exact path="/rates">
                                <ReviewRates
                                    value={props.rate}
                                    data={props.history}
                                    pairs={props.pairs}/>
                            </Route>
                            <Route exact path="/submit">
                                <RatePredictionForm
                                    current={props.currentPrediction}
                                    pairs={props.pairs}
                                    value={props.rate}/>
                            </Route>
                            <Route exact path="/review">
                                <PredictionsList
                                    pair={props.predictionsPair}
                                    filter={props.predictionsFilter}
                                    values={props.predictions}/>
                            </Route>
                            <Route exact path="/analyze">
                                <PredictionsAnalyze
                                    data={props.analyze}/>
                            </Route>
                        </Switch>
                    </div>
                </AuthGuard>
            }
        </BrowserRouter>
    )
}


export default connect(
    (state) => ({
        ...state,
        pairs: [state.rates.base, state.rates.target],
        rate: round4(state.rates.latest),
        lastRatesCheckTime: state.rates.time
    })
)(App);
