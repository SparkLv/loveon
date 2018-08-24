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
}

export default Config