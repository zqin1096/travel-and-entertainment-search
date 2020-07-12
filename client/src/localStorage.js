export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        // Convert text into a JS object.
        return JSON.parse(serializedState);
    } catch (e) {
        // User privacy mode may not allow the use of localStorage.
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {

    }
};