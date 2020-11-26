import React from 'react';
import {useHistory, Redirect, Route, Switch} from "react-router-dom";
import SignUp from "./signup";
import LogIn from "./login";
import RestorePw from "./restorePw";
import Promo from "./promo/promo";

import logoImage from '../../assets/logo.png';
import AppHistory from "../../utils/appHistory";

function Landing() {
    AppHistory.instance = useHistory();

    return (
        <>
            <div className="d-flex align-items-baseline justify-content-between container mt-4">
                <img src={logoImage} />
                <h2 className="accent2-text text-strong text-right mb-0 pl-5">
                    Your exchange rate forecast manager
                </h2>
            </div>
            <div className="container w-100 d-flex mb-4 ">
                <span className="alert-text text-strong ml-auto">beta</span>
            </div>
            <div className="my-3 mx-auto p-5 container block-shadowed">
                <div className="row">
                    <div className="d-none d-md-flex col-sm-12 col-lg-7">
                        <Promo/>
                    </div>
                    <div className="col-sm-12 col-lg-5">
                        <Switch>
                            <Route exact path="/">
                                <LogIn/>
                            </Route>
                            <Route exact path="/signup">
                                <SignUp/>
                            </Route>
                            <Route exact path="/reset-password">
                                <RestorePw/>
                            </Route>
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}

Landing.propTypes = {

};

export default Landing;

