import React from 'react';
import {Redirect, Route} from "react-router-dom";

const AuthGuard = ({ auth, ...props }) => (
    <Route
        {...props.exact}
        {...props.path}
        render={() => (
            auth === true
                ? props.children
                : <Redirect to='/' />
        )} />
);

export default AuthGuard;
