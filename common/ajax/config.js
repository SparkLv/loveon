import io from 'socket.io-client';

class Config {
    static get(url, success, error) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.code == 1) {
                    success(data.data)
                } else {
                    error(data);
                }
            });
    }
    static post(url, body, success, error) {
        fetch(url, {
            method: "post", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.code == 1) {
                    success(data.data)
                } else {
                    error(data);
                }
            });
    }
    static uPost(url, body, success, error) {
        fetch(url, {
            method: "post", body
        })
            .then(res => res.json())
            .then(data => {
                if (data.code == 1) {
                    success()
                } else {
                    error(data);
                }
            });
    }
    static connetBySocket(url, success, error) {
        const socket = io(url);
        socket.on("connect", () => {
            success(socket);
        })
        socket.on('connect_error', (err) => {
            error(err);
        })
        socket.on('connect_timeout', (timeout) => {
            error(timeout);
        })
    }
}

export default Config