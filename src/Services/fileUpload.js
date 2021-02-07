import axios from 'axios';

import authHeader from './authHeader';


const API_URL = 'https://api.cloudvault.ml/';
// const API_URL = 'http://localhost:3300/';

class FileUpload{
    fileUpload(data){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.post(API_URL+"upload",data,config)
    }
    listFiles(){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.get(API_URL+"listfiles",config)
    }
} 

export default new FileUpload();