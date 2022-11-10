import {combineReducers, applyMiddleware, compose, createStore} from "redux";
import counter, {CounterState} from './counter';
import auth, {AuthState, authMiddlewares} from "./auth";
import http, {httpMiddlewares, HTTPState} from "./http";
import boards, {boardsMiddleware, BoardsState} from "./boards";
import {initMiddleware} from "./initialization";
import thunk from "redux-thunk";
import profile, {ProfileState, profileMiddleware} from "./profile";


export interface AppState {
    counter: CounterState,
    auth: AuthState,
    http: HTTPState,
    boards: BoardsState,
    profile: ProfileState
}

const composeEnhancers =
    process.env.NODE_DEV !== 'production' &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ?
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

export default function configureStore() {
    const rootReducer = combineReducers<AppState>({
        counter,
        auth,
        http,
        boards,
        profile
    });

    return createStore(
        rootReducer,
        undefined,
        composeEnhancers(applyMiddleware(
            thunk,
            ...authMiddlewares,
            ...httpMiddlewares,
            ...initMiddleware,
            ...boardsMiddleware,
            ...profileMiddleware
        ))
    )
}

export * from './counter';
export * from './auth';