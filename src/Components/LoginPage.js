import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import Input from "react-validation/build/input";



export default function LoginPage(){

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const emailOnChange =(emaill)=>{
setEmail(emaill)
}


const passwordOnChange = () =>{
    setPassword('hellrfoc rfjdb')
}


const submitForm = ()=>{
    console.log('dbfjb')
}

    return (

        <div>            
                <div className="sign__back">
                        <div className="login__block">
                        <div className="login__inner">
                            <div className="login__logo">
                                <img src="/images/icon.png" alt="logo"/>
                            </div>
                            {/* <!-- Login form block --> */}
                            <div className="login__form">
                                <h2>Login to your account</h2>
                                <form onSubmit={submitForm}>
                                    <div className="group__input">
                                        <input type="text" placeholder="Email address" onChange={emailOnChange} value={email}/>
                                    </div>
                                    <div className="group__input forgot__pass">

                                        <input type="password" placeholder="Password" onChange={passwordOnChange} value={password}/>
                                        <Link to="/forget-password">Forgot?</Link>
                                    </div>
                                    <div className="group__submit">
                                        <input type="submit" value="Login"/>
                                    </div>                                                                  
                                    <div className="create__account">                                        
                                        <p>Don't have an account? <Link to="/register">Create account</Link></p>
                                    </div>
                                </form>
                            </div>                        
                        </div>                     
                        </div>       

                    {/* <!-- Bottom copyright --> */}
                    <div className="bottom__float">
                        <p>Copyright © 2021 CloudVault. All Rights Reserved.</p>
                    </div>                    
                </div> 
            </div>



    )

}