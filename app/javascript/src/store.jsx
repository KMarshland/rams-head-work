import { createStore, combineReducers } from 'redux'

import UserReducer from './reducers/user_reducer'

let store = createStore(combineReducers({
    user: UserReducer
}));

export default store;
