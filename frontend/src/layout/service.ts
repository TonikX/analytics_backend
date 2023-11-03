import AnalyticsService from "../service/analytics-service";
import {userService} from '../service/user-service';

class MainService extends AnalyticsService{
    getUserData(){
        return this.get('/auth/users/me');
    }
    getAllUsers(search: string){
        return this.get(`/api/users/search?search=${search || ''}`);
    }
    getUserGroups(){
        return this.get(`/api/user/groups`);
    }

    sendBug(title: string, description: string, file: string){
        return this.post(`/api/bugs_log`, {
            title,
            description,
            file
        });
    }

    refreshToken(){
        return this.post(`/auth/jwt/refresh`, {
            refresh: userService.getRefreshToken()
        });
    }
}

export default MainService;
