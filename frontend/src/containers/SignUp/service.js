import AnalyticsService from "../../service/analytics-service";

class SignInService extends AnalyticsService{
    signUp(formData) {
        return this.post('/auth/users/', formData);
    }
}

export default SignInService;
