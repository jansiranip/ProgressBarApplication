
const EDIT_PROGRESS_BAR = 'EDIT_PROGRESS_BAR';
const ADD_PROGRESS_BAR = 'ADD_PROGRESS_BAR';

export default function reducer(state, action) {
    const completedVal = action.completed ? parseInt(action.completed, 10) : 0;
    const id = action.id ? parseInt(action.id, 10) : 0;
    switch (action.type) {
    case ADD_PROGRESS_BAR:
        return Object.assign({}, state, {
            barList: [{
                completed: completedVal,
                id: action.id,
            }, ...state.barList],
        });

    case EDIT_PROGRESS_BAR:
        const barList = state.barList.map(bar =>
            ((bar.id === id)
                ? (Object.assign(bar, { completed: (( completedVal + bar.completed)) <= 0 ? 0 : (completedVal + bar.completed) }))
                : bar));
        return Object.assign({}, state, { barList: [...barList] });

    default:
        return state;
    }
}
