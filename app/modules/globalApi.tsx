
export const get = async (uri, header, callback) => {
    console.log("get-uri", uri);
    console.log("get-header", header);
    try {
        let response = await fetch(uri, {
            method: 'GET',
            headers: {
                ...header,
                // 'Accept': '*/*',
                // 'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        if (response.ok) {
            callback && callback(true, data, null);
        } else {
            console.log("get-error-data", data);
            callback && callback(false, null, data.message);
        }
    } catch (error) {
        console.log("get-error", error);
        callback && callback(false, null, error.toString());
    }
}

export const post = async (uri, body, header, callback) => {
    console.log("post-uri", uri);
    console.log("post-body", body);
    console.log("post-header", header);
    try {
        let response = await fetch(uri, {
            method: 'POST',
            headers: {
                ...header,
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        let data = await response.json();
        if (response.ok) {
            callback && callback(true, data, null);
        } else {
            console.log("post-error-data", data);
            callback && callback(false, null, data.message);
        }
    } catch (error) {
        console.log("post-error", error);
        callback && callback(false, null, error.toString());
    }
}

export const put = (uri, body, header, callback) => {
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
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                const error = new Error(response.statusText);
                // error.response = response;
                throw error;
            }
        })
        .then(data => {
            // console.log("data", data);
            callback && callback(true, data, null)
        })
        .catch((error) => {
            // console.log(error);
            callback && callback(false, null, error.toString())
        });
}

export const deleteMethod = async (uri, header, callback) => {
    console.log("delete-uri", uri);
    console.log("delete-header", header);
    try {
        let response = await fetch(uri, {
            method: 'DELETE',
            headers: {
                ...header,
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        if (response.ok) {
            callback && callback(true, data, null);
        } else {
            console.log("delete-error-data", data);
            callback && callback(false, null, data.message);
        }
    } catch (error) {
        console.log("delete-error", error);
        callback && callback(false, null, error.toString());
    }
}