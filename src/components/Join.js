import React, { useState, useContext } from "react";
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom';
import { AuthContext } from "..";
import '../App.css';

const Join = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();

        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(res => {
                        console.log(res)
                        history.push('/shake')
                        if (res.user) {
                            Auth.setLoggedIn(true);
                        }
                })
                .catch(e => {
                    setErrors(e.message);
                });
            });
    };

    const handleGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(result => {
                        console.log(result)
                        history.push('/shake')
                        Auth.setLoggedIn(true)
                    })
                    .catch(e => setErrors(e.message));
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Join</h1>
                <form onSubmit={e => handleForm(e)}>
                    <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="email"
                    />
                    <input
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                    />
                    <hr />
                    <button onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="logo"
                        />
                        Join With Google
                    </button>

                    <button type="submit">Login</button>

                    <span>{error}</span>
                </form>
            </header>
    </div>
    );
};

export default withRouter(Join);
