import { Action } from '../types';
import { ACTION_TYPES } from './types';

export interface ProfileState {
    list: Array<any>;
}

const INITIAL_STATE = {
    list: [],
};

export default (
    state: ProfileState = INITIAL_STATE,
    { type, payload }: Action<any>
) => {
    switch (type) {
        case ACTION_TYPES.SET_PROFILE:
            return { ...state, list: payload };
        default:
            return state;
    }
};