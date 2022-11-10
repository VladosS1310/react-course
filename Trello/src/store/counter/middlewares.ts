import {Middleware} from "redux";
import {ACTION_TYPES} from "./types";

const asyncTimeout = async (fn: any, ms: number = 1000) => {
    setTimeout(() => {
        Promise.resolve(fn())
    }, ms)
}

export const asyncIncrease: Middleware = () => (next: any) => {
    return async (action: any) => {
        if (action.type === ACTION_TYPES.INCREASE_COUNT) {
            await asyncTimeout(() => {
                console.log('Hello');
                next(action);
            })
        } else {
            next(action);
        }
    }
}