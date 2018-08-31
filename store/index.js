import { combineReducers, createStore } from 'redux'

import { userInfo, pUserInfo, socket, accessType } from './reducers';
0
const reducers = combineReducers({ userInfo, pUserInfo, socket, accessType });
const store = createStore(reducers);

export default store