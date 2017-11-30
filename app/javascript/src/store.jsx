import { createStore, combineReducers } from 'redux'

import UserReducer from './reducers/user_reducer'
import SetTaskReducer from './reducers/set_task_reducer'
import SetTasksReducer from './reducers/set_tasks_reducer'
import BuildTaskReducer from './reducers/build_task_reducer'

let store = createStore(combineReducers({
    user: UserReducer,
    setTask: SetTaskReducer,
    setTasks: SetTasksReducer,
    buildTask: BuildTaskReducer
}));

export default store;
