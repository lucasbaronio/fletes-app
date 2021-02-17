
export function get(uri, header, callback) {
    // console.log("uri", uri);
    return fetch(uri, {
        headers: { 
            ...header,
        },
    })
        .then(response => {
            // console.log("get-response", response);
            // if (response.status >= 200 && response.status < 300) {
            if (response.ok) {
                return response.json();
            } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(data => {
            // console.log("get-data", data);
            callback(true, data, null)
        })
        .catch((error) => {
            // console.log("get-error", error);
            callback(false, null, error)
        });
}

export function post(uri, body, header, callback) {
    // console.log("post-body", body);
    // console.log("post-header", header);
    return fetch(uri, {
        method: 'post',
        headers: {
            ...header,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(
            response => {
                // console.log("post-response", response);
                return response.json();
            },
            err => {
                // console.log(err);
                const error = new Error(err);
                error.response = response;
                throw error;
            }
        )
        .then(data => {
            // console.log("post-data", data);
            callback && callback(true, data, null)
        })
        .catch((error) => {
            // console.log("post-error", error);
            callback && callback(false, null, error)
        });
}

export function put(uri, body, header, callback) {
    // console.log("uri", uri);
    // console.log("put-body", body);
    return fetch(uri, {
        method: 'put',
        headers: {
            ...header,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(
            response => {
                // console.log("put-response", response);
                return response.json();
            },
            err => {
                // console.log(err);
                const error = new Error(err);
                error.response = response;
                throw error;
            }
        )
        .then(data => {
            // console.log("data", data);
            callback && callback(true, data, null)
        })
        .catch((error) => {
            // console.log(error);
            callback && callback(false, null, error)
        });
}

export function deleteMethod(uri, header, callback) {
    return fetch(uri, {
        method: 'delete',
        headers: {
            ...header,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(
            response => {
                return response.json();
            },
            err => {
                const error = new Error(err);
                error.response = response;
                throw error;
            }
        )
        .then(data => {
            callback && callback(true, data, null)
        })
        .catch((error) => {
            callback && callback(false, null, error)
        });
}