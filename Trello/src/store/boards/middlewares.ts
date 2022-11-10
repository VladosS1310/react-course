import { subscribe } from '../../utils';
import { ACTION_TYPES } from './types';
import { request } from '../http';

const fetchBoardsWorker: any = ({
    action,
    next,
    dispatch
    }: {
    action: any;
    next: any;
    dispatch: any;
}) => {
    console.log('FETCHED');

    // const {payload: {id}} = action;

    // dispatch(
    //   request({
    //       path: `/boards/${id}`,
    //       method: 'PUT',
    //       authRequired: true,
    //       onSuccess: data => {
    //         console.log(data);
    //         },
    //       onError: error => {
    //         console.log(error);
    //       }
    //   })
    // );
    next(action);
};

const fetchMiddleware = ({ dispatch }: any) => (next: any) =>
    subscribe(ACTION_TYPES.FETCH, fetchBoardsWorker)(next, dispatch);

export const boardsMiddleware = [fetchMiddleware];