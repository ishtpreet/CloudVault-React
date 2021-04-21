import axios from 'axios';

import authHeader from './authHeader';


// const API_URL = 'https://api.cloudvault.ml/';
const API_URL = 'http://localhost:3300/';

class FolderService{
    createFolder(data){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        console.log(data)
        return axios.post(API_URL+"createFolder",{name: data},config)
    }
    listFolders(){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.get(API_URL+"listFolders",config)
    }
    // listContentsOfFolder(data){
    //     let AuthHeader = authHeader();
    //     let config = { headers: AuthHeader };
    //     console.log(data)
    //     return axios.post(API_URL+"createFolder",{name: data},config)
    // }
    folderName(data){
        let AuthHeader = authHeader();
        let config = { headers: AuthHeader };
        return axios.post(API_URL+"folder",{name: data},config)
    }
} 

export default new FolderService();