import React from 'react';

const SignUp = () => {
    return (
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" />
            <label for="password">Password</label>
            <input type="password" name="password" />
        </div>
    );
};

export default SignUp;
