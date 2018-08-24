export function userInfo(state = {}, action) {
   return action.type == 'USER_INFO' ? action.data : state
}

export function pUserInfo(state = {}, action) {
    return action.type == 'PUSER_INFO' ? action.data : state
}