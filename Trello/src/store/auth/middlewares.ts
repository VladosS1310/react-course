import {Action} from "../types";
import {ACTION_TYPES} from "./types";
// import {request} from "../http";
import { setToLocalStorage, subscribe, getFromLocalStorage } from '../../utils';
import { setToken } from './actions';


const APP_TOKEN = 'TRELLO_CUSTOM_APP_TOKEN';

const authMiddleware = ({dispatch}: any) => (next: any) => (action: Action<ACTION_TYPES>) => {
    if(action.type === ACTION_TYPES.SET_TOKEN) {
        console.log('SET TOKEN');
        setToLocalStorage(APP_TOKEN, action.payload);
        // setTimeout(() => {
        //     dispatch(
        //         request({
        //             path: '/hello',
        //             onSuccess: () => {
        //                 console.log("success");
        //             }
        //         })
        //     )
        // })
    }
    return next(action);
}

const readTokenWorker = ({ action, next, dispatch }: any) => {
    const token = getFromLocalStorage(APP_TOKEN);
    if (token) {
        dispatch(setToken(token));
    }
}

const readTokenMiddleware = ({ dispatch }: any) => (next: any) =>
    subscribe(ACTION_TYPES.READ_TOKEN, readTokenWorker)(next, dispatch);

export const authMiddlewares = [authMiddleware, readTokenMiddleware];