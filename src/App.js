import React, {useEffect} from 'react';
import {BrowserRouter, NavLink, Route, Switch, Redirect} from "react-router-dom";
import {connect, useStore} from "react-redux";
import RatePredictionForm from "./components/authorized/ratePredictionForm";
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
import CurrenciesRate from "./components/authorized/currenciesRate";

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
                    <nav className="fixed-top nav-main p-4">
                        <ul className="nav nav-pills nav-justified">
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
                                <i className="fa fa-sign-out text-white "/>
                        </button>
                    </nav>

                    <div className="fixed-top"
                        style={{'top': '73px'}}>
                            <CurrenciesRate
                                time={props.lastRatesCheckTime}
                                pairs={props.pairs}
                                value={props.rate} />
                    </div>

                    <div className="container column-center py-3">
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
        pairs: [state.rates.base, state.rates.target],
        rate: round5(state.rates[state.rates.target]) || 0,
        lastRatesCheckTime: state.rates.time || '',
        predictions: state.predictions,
        predictionsFilter: state.predictionsFilter,
        currentPrediction: state.currentPrediction,
        schedulers: state.schedulers,
        history: state.history,
        analyze: state.analyze,
        user: state.user
    })
)(App);
