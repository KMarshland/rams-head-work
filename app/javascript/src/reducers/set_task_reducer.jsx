import Immutable from 'immutable'

export default function SetTaskReducer(state, action) {
    if (state === undefined) {
        state = null;
    }

    if (action.type === 'SET_SET_TASK') {
        if (action.set_task) {
            state = new Immutable.Map(action.set_task);
        } else {
            state = null;
        }
    }

    return state;
}