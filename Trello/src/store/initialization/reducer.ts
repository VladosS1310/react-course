import {v4 as uuidv4} from 'uuid';

import { ACTION_TYPES } from './types';

export interface InitState {
    sessionId?: string
}

export default function (state: InitState = {}, action: any) {
    switch (action.type) {
        case ACTION_TYPES.START:
            return {};
        case ACTION_TYPES.END:
            return {
                sessionId: uuidv4(),
            };
        default:
            return state;
    }
}