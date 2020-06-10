import BaseService from "../../service/base-service";

class SignInService extends BaseService{
    signUp(formData) {
        return this.post('/auth/users/', formData);
    }
}

export default SignInService;