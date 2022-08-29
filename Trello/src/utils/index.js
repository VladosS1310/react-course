export const setLocalStorage = async (key, data) => {
    window.localStorage.setItem(key, data);
}