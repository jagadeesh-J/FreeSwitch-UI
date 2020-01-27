import 'whatwg-fetch';
// import store from './store';

class serviceRequest {
    static login(username) {
        return serviceRequest.request('/login', {
            method: 'POST',
            body: JSON.stringify(username)
        });
    }

    // static getResultsRunsDetailExport(data) {
    //     return fetch('http://localhost:5002/runsdetailexport?data=' + encodeURIComponent(JSON.stringify(data)), {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'data:text/csv; charset=utf-8',
    //                 'Access-Control-Allow-Origin': '*',
    //                 'x-access-token': localStorage.getItem('token')
    //             }
    //         })
    //         .then(response => response.blob())
    //         .then(blob => {
    //             var url = window.URL.createObjectURL(blob);
    //             var a = document.createElement('a');
    //             a.href = url;
    //             a.download = `Runs&Results_${new Date().valueOf()}.csv`;
    //             document.body.appendChild(a);
    //             a.click();
    //             a.remove();
    //             return JSON.stringify({ status: 'success' });
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    static saveTranslations(data, lang) {
        return serviceRequest.request(`/translationssave/${lang}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    static updateConfigVariables(data) {
        return serviceRequest.request(`/getxml`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    static getXmlData(url) {
      return serviceRequest.request(`/${url}`);
    }
    static request(uri, options) {
        const {
            options: opts,
            serviceURL,
        } = getDefaults();
        const url = `${serviceURL}${uri}`;
        return fetch(url, Object.assign({}, opts, options))
            .then(status)
            .then(parse)
            .catch(e => {
                console.log(e, serviceURL, uri, options);
            });
    }

}

/**
 * Determines the status of the incoming service response, returning
 * the response object if the status code is within the 200-300 range,
 * otherwise an exception is thrown which must be handled by calling
 * code.
 *
 * @method  status
 * @param   {object} response the returned service response which is to
 *          be inspected to determine for success or failure.
 * @returns {object} The response object returned by the given service.
 * @throws  {error} An error containing the service response error status
 *          text (if any). The error which is thrown contains the following
 *          properties: time, status, code, url, isError, isWarning.
 */
export const status = (response) => {
    const ret = response.status;
    if (ret === 401 || ret === 403) {
        localStorage.clear();
        document.location.href = "/";
    }
    if (ret < 200 || ret >= 400) {
        return response.json().then((json) => {
            const error = {
                time: new Date().toString(),
                status: response.statusText,
                code: response.status,
                url: response.url,
                authFailed: response.status === 401 || response.status === 403,
                isError: response.status >= 500,
                isWarning: response.status < 500,
                message: JSON.parse(json),
            };
            throw error;
        });
    }
    return response;
};

/**
 * Parses the API response JSON document and returns the value.
 *
 * @method  parse
 * @param   {object} response the returned service response to be parsed.
 * @returns {object} The JSON representation of the service response.
 */
const parse = (response) => {
    return response.json().then((data) => {
        if (data) {
            return data;
        }
        return {};
    });
};

/**
 * Defines the default service root url and request options used for
 * each Alerts Service invocation.
 *
 * @private
 */
const _defaults = {
    options: {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {},
    },
};

/**
 * Generates and returns the default Connect Service request options
 * based on the given environment (i.e. environment.json configuration)
 * as provided to setConfig.
 *
 * @method  getDefaults
 * @param   {boolean} forceReset When true, forces a reset of the defaults.
 * @returns {object} an object representing the service request options.
 */
export const getDefaults = () => {
    // On first load/ On first login
    // _defaults.serviceURL && _defaults.options.headers.Authorization are undefined.
    if (!_defaults.serviceURL || !_defaults.options.headers.Authorization) {
        _defaults.serviceURL = 'http://192.168.1.182:4000'
        _defaults.options.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
                // Assigning token to Authorization in header
                // Authorization: store.getters.getToken
        };
    }
    // We can also use store.getters.getToken
    // Getting token from store state
    // store.state.token && store.getters.getToken returns token
    // console.log('localStorage.getItem', localStorage.getItem('token'));
    _defaults.options.headers['Authorization'] = localStorage.getItem('token');
    // _defaults.options.headers['x-access-token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZGRzZnMiLCJleHAiOjE1NzQwNTcwMzF9.fpb9a_y7XeDmCNshYBdrdzmwcO2zCDg9hziJHktXSBA';
    return _defaults;
};

export default serviceRequest;
