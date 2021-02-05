export default function authHeader() {
    if(localStorage.getItem('user')){
      const accessToken = localStorage.getItem('user');
      if(accessToken)
        return {'x-access-token': accessToken};
    }
}