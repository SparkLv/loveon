import Config from './config';

const ip = 'http://10.0.52.22:2421';
const socketIp = 'http://10.0.52.22:2422';

class Ajax extends Config {
    static getInitTrends(id, pid, success, error) {
        const url = ip + `/loveon/getInit/${id}/${pid}`;
        this.get(url, success, error);
    }
    static updataTrends(body, success, error) {
        const url = ip + '/loveon/getUpdate';
        this.post(url, body, success, error);
    }
}
export default Ajax