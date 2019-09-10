import React from 'react';
import logo from '../logo.svg';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
}

const Login = () => {
    return [
        <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />,
        <div>
            <img src={logo} className="App-logo" alt="logo" width="125" height="125" />
            <label for="email">Email</label>
            <input type="email" name="email" />
            <label for="password">Password</label>
            <input type="password" name="password" />
        </div>
    ];
};

export default Login;
