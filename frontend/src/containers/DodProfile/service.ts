import AnalyticsService from "../../service/analytics-service";

class DodProfileService extends AnalyticsService{
    getDodProfile(currentPage: number,) {
        return this.get(`api/workprograms?page=${currentPage}`);
}

    getCurrentUserName(){
        return this.get(`/auth/users/me`);
    }

    getCurrentUserGroups(){
        return this.get(`/api/user/groups`);
    }
}

export default DodProfileService;