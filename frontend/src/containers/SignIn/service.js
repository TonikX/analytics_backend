import BaseService from "../../service/base-service";

class SignInService extends BaseService{
    signIn(password, username){
        const formData = new FormData();

        formData.append('password', password);
        formData.append('username', username);

        return this.post('/auth/token/login/', formData);
    }
}

export default SignInService;