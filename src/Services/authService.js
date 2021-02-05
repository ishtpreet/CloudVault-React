import axios from 'axios';



const API_URL = 'http://localhost:3300/';
// const API_URL = 'http://192.168.29.149:3300/';



class AuthService{
registerUser(name, email, password){
    return axios.post(API_URL+"createUser",{name, email, password})
}
userLogIn(email,password){
    return axios.post(API_URL+"signin",{email, password})
}
getCurrentUser(token){
    let config = { headers: token };
    return axios.get(API_URL+"dashboard",config)
}
resetPassword(email){
    return axios.post(API_URL+"forgotPassword",{email})
}
verifyPasswordResetToken(token){
    return axios.post(API_URL+"verifyFToken",{token})
}


}

export default new AuthService();