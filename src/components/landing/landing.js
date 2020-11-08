import React, {useState} from 'react';
import {Link, useHistory, Switch, Route} from "react-router-dom";
import SignUp from "./signup";
import LogIn from "./login";
import RestorePw from "./restorePw";

function Landing(props) {

    return (

        <div>
            <nav className="fixed-top bg-dark p-4">
                <ul className="nav nav-pills nav-justified">
                    <li className="nav-item">
                        <Link className={'text-light'} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={'text-light'} to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>

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
            </Switch>
        </div>
    )
}

Landing.propTypes = {

};

export default Landing;

