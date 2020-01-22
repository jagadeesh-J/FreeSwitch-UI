import { request } from './client';

const API_BASE_ADDRESS = 'http://localhost:4000';

export default class Api {
    static getAppConfig() {
        const uri = API_BASE_ADDRESS + "/app";

        return request(uri, {
            method: 'GET'
        });
    }
}