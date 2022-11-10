import { subscribe } from '../../utils';
import { ACTION_TYPES } from './types';


const fetchProfileWorker: any = ({action, next}: {
    action: any;
    next: any;
}) => {
    console.log('FETCHED PROFILE');
    next(action);
};

const fetchMiddleware = ({ dispatch }: any) => (next: any) =>
    subscribe(ACTION_TYPES.FETCH, fetchProfileWorker)(next, dispatch);

export const profileMiddleware = [fetchMiddleware];