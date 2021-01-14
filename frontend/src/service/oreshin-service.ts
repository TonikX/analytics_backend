import axiosLib, {AxiosInstance} from 'axios';

import BaseService from "./base-service";

export default class OreshinService extends BaseService {
    static token = 'eAWT2SANK1wVTIMZhIzm1rlf3ZmYlYoy';
    static baseUrl = 'http://77.234.209.90:4800';
    static axios : AxiosInstance | null = null;

    createInstance = (): AxiosInstance => {
        const _axios = axiosLib.create({
            baseURL: OreshinService.baseUrl,
        });

        _axios.interceptors.response.use(this.interceptSuccessResponse, this.interceptFailResponse);

        return _axios;
    };

    getToken = (): string => OreshinService.token;

    createPostObject = (object: Object) => ({
        ...object,
        token: this.getToken()
    })
    
    getAxios(): AxiosInstance {
        let _axios: AxiosInstance;

        if (OreshinService.axios == null) {
            _axios = this.createInstance();
            OreshinService.axios = _axios;
        } else {
            _axios = OreshinService.axios;
        }

        _axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        _axios.defaults.xsrfCookieName = "csrftoken";

        return _axios;
    }
}