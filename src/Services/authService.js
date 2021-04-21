import axios from 'axios';



// const API_URL = 'https://api.cloudvault.ml/';
const API_URL = 'http://localhost:3300/';



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
//TO send email
resetPassword(email){
    return axios.post(API_URL+"forgotPassword",{email})
}
verifyPasswordResetToken(token){
    return axios.post(API_URL+"verifyFToken",{token})
}

resetPasswordUsingToken(token,password){
    return axios.post(API_URL+"passwordReset",{token,password})
}


}

export default new AuthService();