import {config} from "./app-config";

export default {
    getApiBasePath() {
        // return 'https://op.itmo.ru';
        return `${config.apiSchema}://${config.apiHost}${config.apiPort ? ":" + config.apiPort : ""}`;
    },
};
