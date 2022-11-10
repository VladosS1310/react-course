import { AppState } from "../index";

export const getBoards = (appState: AppState): Array<any> =>
    appState.boards.list;