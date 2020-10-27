import React, {useState} from 'react';
import SignUp from "./signup";
import LogIn from "./login";


function Landing(props) {
    const [state, setState] = useState({
        showRegister: false
    });

    return (
        <div>
            <button className="btn"
                type="button"
                    onClick={() => setState({showRegister: !state.showRegister})}>
                        Toggle
            </button>

            {!state.showRegister ? <LogIn/> : <SignUp/>}
        </div>
    )
}

Landing.propTypes = {

};

export default Landing;

