import React, {useEffect, useState} from 'react';
import {useStore} from "react-redux";
import {registerUser} from "../../actions";
import {NavLink} from "react-router-dom";


function SignUp() {
    const store = useStore();
    const [value, setState] = useState({
        email: '',
        pw: '',
        name: '',
        terms: false
    });

    return (

        <div className="container column-center pb-5">
            <div className="d-flex flex-column mb-4">
                <label
                    htmlFor="signupName"
                    className="">
                        Name (optional)
                </label>
                <input
                    id="signupName"
                    className="input-trans mt-2"
                    type="text"
                    defaultValue={value.name}
                    onChange={(event) => setState({
                        ...value,
                        name: event.target.value
                    })} />
            </div>

            <div className="d-flex flex-column">
                <label
                    htmlFor="signupEmail"
                    className="">
                        E-mail*
                </label>
                <input
                    id="signupEmail"
                    className="input-trans mt-2"
                    type="text"
                    defaultValue={value.email}
                    onChange={(event) => setState({
                        ...value,
                        email: event.target.value
                    })} />
            </div>

            <div className="d-flex flex-column my-4">
                <label
                    htmlFor="signupPw"
                    className="">
                        Password*
                </label>
                <input
                    id="signupPw"
                    className="input-trans mt-2"
                    type="password"
                    defaultValue={value.pw}
                    onChange={(event) => setState({
                        ...value,
                        pw: event.target.value
                    })} />
            </div>

            <label htmlFor="terms"
                style={{'width': '200px'}}
                className=" my-4 as-button ">
                    <input id="terms" type="checkbox"
                        value={value.terms}
                        onChange={(event) => setState({
                            ...value,
                            terms: event.target.checked
                        })} />
                    <span className="pl-3">I agree to</span>
                    <a target="_blank" href="./pdfs/privacy.pdf" className="underlined"> Privacy policy </a> and
                    <a target="_blank" href="./pdfs/terms.pdf" className="underlined"> Terms and Conditions </a>
            </label>

            <div className="d-flex align-items-center mt-4">
                <button
                    type="button"
                    className="btn btn-block btn-primary"
                    disabled={!value.pw || !value.email || !value.terms}
                    onClick={() => store.dispatch(registerUser(value))}>
                        Sign me up
                </button>

                <span className="px-4">or</span>

                <NavLink activeClassName="active" exact to="/">
                    Log&nbsp;in
                </NavLink>
            </div>


        </div>
    )
}

SignUp.propTypes = {

};

export default SignUp;

