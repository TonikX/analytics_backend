import BaseService from "../service/base-service";

class MainService extends BaseService{
    getUserData(){
        return this.get('/auth/users/me');
    }
    getAllUsers(search: string){
        return this.get(`/api/users/search?search=${search || ''}`);
    }
}

export default MainService;