import axios from 'axios';

export default function apiCall(param) {
    const { reqData, method, headerData, reqUrl } = param;

    let headers = {};
    if(headerData)
        headers = headerData;

    /** GET request */
    if (method == "GET") {
        return axios.get(reqUrl);
    }

    /** POST request */
    if (method == "POST") {
        return axios({
            url:  reqUrl,
            data: reqData,
            method: 'POST',
            headers: headers
        });
    }

    /** PUT request */
    if (method == "PUT") {
        return axios({
            url:  reqUrl,
            data: reqData,
            method: 'PUT',
            headers: headers
        });
    }

    /** DELETE request */
    if (method == "DELETE") {
        return axios({
            url:  reqUrl,
            data: reqData,
            method: 'DELETE',
            headers: headers
        });
    }
}