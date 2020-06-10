import BaseService from "../service/base-service";

class MainService extends BaseService{
    getUserData(){
        return this.get('/auth/users/me');
    }
}

export default MainService;