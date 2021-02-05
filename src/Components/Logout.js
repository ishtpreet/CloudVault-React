import React from 'react'
import { useHistory} from 'react-router-dom';

export default function Logout() {
    let history = useHistory();
    let user = localStorage.getItem('user');
    if(user){
        localStorage.removeItem('user');
        history.push('/')
    }
    return (
        <div>
            
        </div>
    )
}
