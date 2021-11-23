import AnalyticsService from "../../service/analytics-service";

class DodProfileService extends AnalyticsService{
    getDodProfile(currentPage: number,tableMode:number) {
        return this.get(`api/workprograms?page=${currentPage}&filter=${tableMode === 1 ? 'iamexpert' : 'my'}`);
}

    getCurrentUserName(){
        return this.get(`/auth/users/me`);
    }

    getCurrentUserGroups(){
        return this.get(`/api/user/groups`);
    }
}

export default DodProfileService;