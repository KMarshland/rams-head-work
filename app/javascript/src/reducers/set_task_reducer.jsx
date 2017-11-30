import Immutable from 'immutable'

export default function SetTaskReducer(state, action) {
    if (state === undefined) {
        state = null;
    }

    if (action.type === 'SET_SET_TASK') {
        if (action.set_task) {
            action.set_task.build_tasks = new Immutable.List(action.set_task.build_tasks.map(function (task) {
                return new Immutable.Map(task);
            }));
            state = new Immutable.Map(action.set_task);
        } else {
            state = null;
        }
    }

    return state;
}