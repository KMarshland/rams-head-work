import Immutable from 'immutable'

export default function UserReducer(state, action) {
    if (state === undefined) {
        state = null;
    }

    if (action.type === 'SET_USER') {
        if (action.user) {
            state = new Immutable.Map(action.user);
        } else {
            state = null;
        }
    }

    return state;
}