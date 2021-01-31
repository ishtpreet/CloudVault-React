import axios from 'axios';

const API_URL = 'http://localhost:3300/';


class AuthService{
registerUser(name, email, password){
    return axios.post(API_URL+"createUser",{name, email, password})
}
}

export default new AuthService();