import Immutable from 'immutable'

export default function BuildTaskReducer(state, action) {
    if (state === undefined) {
        state = null;
    }

    if (action.type === 'SET_BUILD_TASK') {
        if (action.build_task) {
            state = new Immutable.Map(action.build_task);
        } else {
            state = null;
        }
    }

    return state;
}