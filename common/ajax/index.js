import Config from './config';

const ip = 'http://10.0.52.22:2421';
const socketIp = 'ws://10.0.52.22:2422';

// const ip = 'http://118.24.6.102:2421';
// const socketIp = 'ws://118.24.6.102:2422';


class Ajax extends Config {
    static register(body, success, error) {
        const url = ip + `/loveon/user/register`;
        this.post(url, body, success, error)
    }
    static login(body, success, error) {
        const url = ip + `/loveon/user/login`;
        this.post(url, body, success, error);
    }
    static connectP(body, success, error) {
        const url = ip + `/loveon/user/connect`;
        this.post(url, body, success, error);
    }
    static getInitTrends(id, pid, success, error) {
        const url = ip + `/loveon/getInit/${id}/${pid}`;
        this.get(url, success, error);
    }
    static updataTrends(body, success, error) {
        const url = ip + '/loveon/getUpdate';
        this.post(url, body, success, error);
    }
    static socketCon(id, pid, success, error) {
        const url = socketIp + `?id=${id}&pid=${pid}`;
        return this.connetBySocket(url, success, error);
    }
    static uploadImg(body, success, error) {
        const url = ip + `/loveon/upload`;
        this.uPost(url, body, success, error);
    }
    static addFav(body, success, error) {
        const url = ip + `/loveon/add`;
        this.post(url, body, success, error);
    }
    static getUserInfoById(id, success, error) {
        const url = ip + `/loveon/user/getById/${id}`;
        this.get(url, success, error);
    }
    static getMovies(success, error) {
        const url = ip + `/loveon/get/movie`;
        this.get(url, success, error);
    }
}
export default Ajax