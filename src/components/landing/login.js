import React, {useState} from 'react';
import {useStore} from "react-redux";
import {login, restorePw} from "../../actions";


function LogIn() {
    const store = useStore();
    const [value, setState] = useState({
        email: 'u@u.u',
        pw: '1111'
    });

    return (
        <div className="container column-center py-5">
            <div className="d-flex flex-column">
                <label
                    htmlFor="signupEmail"
                    className="">
                        E-mail
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
                        Password
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

            <div className="d-flex flex-column mt-4">
                <button
                    type="button"
                    className="btn btn-block btn-primary"
                    disabled={!value.pw || !value.email }
                    onClick={() => store.dispatch(login(value))}>
                        Log in
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={!value.email }
                    onClick={() => store.dispatch(restorePw(value.email))}>
                        Restore password
                </button>
            </div>


        </div>
    )
}

LogIn.propTypes = {

};

export default LogIn;

