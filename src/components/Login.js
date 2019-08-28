import React from 'react';
import logo from '../logo.svg';

const Login = () => {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" width="125" height="125" />
            <label for="email">Email</label>
            <input type="email" name="email" />
            <label for="password">Password</label>
            <input type="password" name="password" />
        </div>
    );
};

export default Login;
