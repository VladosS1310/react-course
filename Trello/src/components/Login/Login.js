import React from 'react';

const Login = () => {
    const {REACT_APP_KEY, REACT_APP_SCOPE, REACT_APP_NAME, REACT_APP_REDIRECT_URL} = process.env;
    const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_KEY}`;

    return (
        <div>
            <a href={requestUrl}>Login with Trello account</a>
            <h2>Please Login</h2>
        </div>
    );
};

export default Login;