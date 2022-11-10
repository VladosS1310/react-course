import { ACTION_TYPES } from './types';
import { getToken } from '../auth';
import {makeUrl} from "../../utils/makeUrl";


export const fetchBoards = () => async (dispatch: any, getState: any) => {
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
        makeUrl('/1/members/me/boards', true, token),
        options
    );
    const data = await response.json();

    dispatch(setBoards(data));
};

export const editBoardName = (id: string, name: string) => ({
    type: ACTION_TYPES.EDIT_BOARD,
    payload: {id, name}
})

export const setBoards = (data: Array<any>) => ({
    type: ACTION_TYPES.SET_BOARDS,
    payload: data
});