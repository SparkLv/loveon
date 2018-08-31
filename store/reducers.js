export function userInfo(state = {}, action) {
    return action.type == 'USER_INFO' ? action.data : state;
}

export function pUserInfo(state = {}, action) {
    return action.type == 'PUSER_INFO' ? action.data : state;
}
export function socket(state = false, action) {
    return action.type == 'SET_SOCKET' ? action.data : state;
}
export function accessType(state = false, action) {
    return action.type == 'ACCESS_BY' ? action.data : state;
}