import { ACTION_TYPES } from './types';
import { getToken } from '../auth';
import {makeUrl} from "../../utils/makeUrl";


export const fetchProfile = () => async (dispatch: any, getState: any) => {
    const appState = getState!();
    const token = getToken(appState);

    const options: any = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(
        makeUrl('/1/members/me', true, token),
        options
    );
    const data = await response.json();

    dispatch(setProfile(data));
};

export const setProfile = (data: Array<any>) => ({
    type: ACTION_TYPES.SET_PROFILE,
    payload: data
});