import React, {useEffect, useState} from 'react';
import {setLocalStorage} from "../../utils";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";

const Authorization = () => {
    const [token, setToken] = useState(window.location.hash.split('=')[1]);
    const TOKEN_STORAGE_KEY = 'TOKEN';

    useEffect(  () => {
         (async function () {
             if (token) {
                 setToken(token);
                 await setLocalStorage(TOKEN_STORAGE_KEY, token);
             }
         }());
    })

    const isLoggedIn = () => {
        return !!token;
    }

    const renderHeader = () => {
        return (
            <header>
                {
                    isLoggedIn() ? "Hello user" : "Not logged in"
                }
            </header>
        )
    }

    const renderContent = () => {
        return (
            <div>
                {
                    isLoggedIn() ? <Dashboard/> : <Login />
                }
            </div>
        )
    }

    return (
        <div>
            {renderHeader()}
            {renderContent()}
        </div>
    );
};

export default Authorization;