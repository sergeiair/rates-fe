import React, {useState} from 'react';
import {useStore} from "react-redux";
import {registerUser} from "../../actions";


function SignUp() {
    const store = useStore();
    const [value, setState] = useState({
        email: 'u@u.u',
        pw: '1111',
        name: ''
    });

    return (

        <div className="container column-center py-5">
            <div className="d-flex flex-column my-4">
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

            <div className="d-flex flex-column mt-4">
                <button
                    type="button"
                    className="btn btn-block btn-primary"
                    disabled={!value.pw || !value.email }
                    onClick={() => store.dispatch(registerUser(value))}>
                        Sign me up
                </button>
            </div>


        </div>
    )
}

SignUp.propTypes = {

};

export default SignUp;

