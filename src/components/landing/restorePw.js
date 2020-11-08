import React, {useState} from 'react';
import {useStore} from "react-redux";
import {createPw} from "../../actions";
import {isNewPwInvalid} from "../../utils/pw";


function RestorePw() {
    const store = useStore();
    const [value, setState] = useState({
        pw: '12345678',
        pwRep: '12345678',
        token: window.location.search.split('=')[1]
    });

    return (
        <form className="container column-center py-5">
            <div className="d-flex flex-column">
                <label
                    htmlFor="password1"
                    className="">
                        Password
                </label>
                <input
                    id="password1"
                    className="input-trans mt-2"
                    type="password"
                    min={8}
                    required={true}
                    defaultValue={value.pw}
                    onChange={(event) => setState({
                        ...value,
                        pw: event.target.value
                    })} />
            </div>

            <div className="d-flex flex-column mt-3">
                <label
                    htmlFor="password2"
                    className="">
                        Repeat password
                </label>
                <input
                    id="password2"
                    className="input-trans mt-2"
                    type="password"
                    min={8}
                    required={true}
                    defaultValue={value.pwRep}
                    onChange={(event) => setState({
                        ...value,
                        pwRep: event.target.value
                    })} />
            </div>

            <div className="d-flex flex-column mt-4">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isNewPwInvalid(value.pw, value.pwRep) || !value.token}
                    onClick={(event) => {
                        event.preventDefault();
                        store.dispatch(createPw({
                            pw: value.pw,
                            v: value.token
                        }));
                    }}>
                        Create password
                </button>

            </div>


        </form>
    )
}

RestorePw.propTypes = {

};

export default RestorePw;

