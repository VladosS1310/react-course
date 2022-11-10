export const setToLocalStorage = (key: string, data: any) => {
    window.localStorage.setItem(key, data);
}

export const getFromLocalStorage = (key: string) => {
    return window.localStorage.getItem(key) || '';
}