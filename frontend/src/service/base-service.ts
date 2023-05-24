import get from 'lodash/get';
import axiosLib, {AxiosResponse, AxiosInstance} from 'axios';

import AppConfig from '../config/app-config-service';

export default class BaseService {
    static axios : AxiosInstance | null = null;

    get<T = any, R = AxiosResponse>(url: string) {
        return new Promise<R>((successFn, errorFn) => {
            this.getAxios().get<T, R>(url).then(successFn).catch(errorFn);
        });
    }

    post<T = any, R = AxiosResponse>(url: string, postData: any, config = {}) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().post<T, R>(url, postData).then(successFn).catch(errorFn);
        });
    }

    patch<T = any, R = AxiosResponse>(url: string, patchData: any, config = {}) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().patch<T, R>(url, patchData).then(successFn).catch(errorFn);
        });
    }

    delete<T = any, R = AxiosResponse>(url: string, config = {}) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().delete<T, R>(url).then(successFn).catch(errorFn);
        });
    }

    put<T = any, R = AxiosResponse>(url: string, putData: any, config = {}) {
        return new Promise((successFn, errorFn) => {
            this.getAxios().put<T, R>(url, putData).then(successFn).catch(errorFn);
        });
    }

    interceptSuccessResponse = (response: any) => {
        return {
            ...response,
            data: get(response, 'data')
        }
    };

    interceptFailResponse = (error: any) => {
        const errors = get(error, 'response.data', {});

        const errorsArray = Object.keys(errors).map(key => errors[key]);

        return Promise.reject(errorsArray);
    };

    createInstance = (): AxiosInstance => {
        console.log('AppConfig.getApiBasePath()', AppConfig.getApiBasePath())
        const _axios = axiosLib.create({
            baseURL: AppConfig.getApiBasePath(),
        });

        _axios.interceptors.response.use(this.interceptSuccessResponse, this.interceptFailResponse);

        return _axios;
    };

    getAxios(): AxiosInstance {
        let _axios: AxiosInstance;

        if (BaseService.axios == null) {
            _axios = this.createInstance();
            BaseService.axios = _axios;
        } else {
            _axios = BaseService.axios;
        }

        _axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        _axios.defaults.xsrfCookieName = "csrftoken";

        return _axios;
    }
}