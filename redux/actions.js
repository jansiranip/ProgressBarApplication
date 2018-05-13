const actions = {
    addProgressBar(completed, id) {
        return {
            type: 'ADD_PROGRESS_BAR',
            id,
            completed,
        };
    },
    changeProgressBar(completed, id) {
        return {
            type: 'EDIT_PROGRESS_BAR',
            id,
            completed,
        };
    },
};

export default actions;
