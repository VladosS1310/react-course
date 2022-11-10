import { AppState } from "../index";

export const getProfile = (appState: AppState): Array<any> =>
    appState.profile.list;