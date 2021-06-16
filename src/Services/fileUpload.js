import axios from 'axios';

import authHeader from './authHeader';


const API_URL = 'https://cloudvault-api.herokuapp.com/';
// const API_URL = 'http://localhost:3300/';

class FileUpload{
    fileUpload(data){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.post(API_URL+"upload",data,config)
    }
    fileUpload(data,parentFolder){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.post(API_URL+"upload/"+parentFolder,data,config)
    }
    //At root Directory
    listFiles(){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.post(API_URL+"listfiles",config)
    }
    //At Specific Directory
    listFiles(data){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.post(API_URL+"listfiles",{parentFolder: data},config)
    }
    deleteFile(data){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.post(API_URL+"deleteFile",{fileId: data},config)
    }
    shareFile(name, email){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.post(API_URL+"shareFile",{name: name, email: email},config)
    }
} 

export default new FileUpload();