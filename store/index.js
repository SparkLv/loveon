import { combineReducers, createStore } from 'redux'

import { userInfo, pUserInfo, socket } from './reducers';
0
const reducers = combineReducers({ userInfo, pUserInfo, socket });
const store = createStore(reducers);

export default store