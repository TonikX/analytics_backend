import BaseService from "../../../service/base-service";

class Service extends BaseService{
    getFolders(){
        return this.get(`/api/folders`);
    }
}

export default Service;