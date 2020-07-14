export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('favorites');
        if (serializedState === null) {
            return undefined;
        }
        // Convert text into a JS object.
        const favorites = JSON.parse(serializedState);
        return {
            favorites: favorites
        };
    } catch (e) {
        // User privacy mode may not allow the use of localStorage.
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('favorites', serializedState);
    } catch (e) {

    }
};