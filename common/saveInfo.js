import store from '../store'
import Ajax from './ajax'

class SaveInfo {
    static save(userInfo, callback) {
        store.dispatch({ type: "USER_INFO", data: userInfo });
        const { pid } = userInfo;
        if (pid) {
            Ajax.getUserInfoById(pid, (data) => {
                store.dispatch({ type: "PUSER_INFO", data });
                callback();
            })
        }
        else {
            store.dispatch({ type: "PUSER_INFO", data: false });
            callback();
        }
    }
}

export default SaveInfo