import {AxiosInstance} from 'axios';

import UserService from "./user-service";
import BaseService from "./base-service";

const userService = UserService.factory();

export default class AnalyticsService extends BaseService {
    static axios : AxiosInstance | null = null;

    getAxios(): AxiosInstance {
        let _axios: AxiosInstance;

        if (AnalyticsService.axios == null) {
            _axios = this.createInstance();
            AnalyticsService.axios = _axios;
        } else {
            _axios = AnalyticsService.axios;
        }

        _axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        _axios.defaults.xsrfCookieName = "csrftoken";

        const isAuth = userService.isAuth();

        if (_axios !== null && isAuth) {
            _axios.defaults.headers.common['Authorization'] = `Bearer ${userService.getToken()}`;
        }

        return _axios;
    }
}
