import AnalyticsService from "../../service/analytics-service";

class SignInService extends AnalyticsService {
  signIn(password, username) {
    const formData = new FormData();

    formData.append('password', password)
    formData.append('username', username)

    return this.post('/auth/jwt/create/', formData)
  }
}

export default SignInService;
