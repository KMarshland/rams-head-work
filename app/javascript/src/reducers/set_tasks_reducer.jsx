import Immutable from 'immutable'

export default function SetTasksReducer(state, action) {
    if (state === undefined) {
        state = new Immutable.List();
    }

    if (action.type === 'SET_SET_TASKS') {
        if (action.set_tasks) {
            state = new Immutable.List(action.set_tasks.map(function (task) {

                task.build_tasks = new Immutable.List(task.build_tasks.map(function (task) {
                    return new Immutable.Map(task);
                }));

                return new Immutable.Map(task);
            }));
        } else {
            state = new Immutable.List();
        }
    }

    return state;
}