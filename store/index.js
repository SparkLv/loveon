import { combineReducers, createStore } from 'redux'

import { userInfo, pUserInfo } from './reducers';
0
const reducers = combineReducers({ userInfo, pUserInfo });
const store = createStore(reducers);

export default store