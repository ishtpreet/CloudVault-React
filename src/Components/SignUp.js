import React, { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from 'validator'

import SpinnerLogin from './SpinnerLogin'
import AuthService from '../Services/authService';
import "bootstrap/dist/css/bootstrap.min.css";
export default function SignUp() {
const [email, setEmail] = useState('');
const [isEmailValid, ValidateEmail] = useState(false)
const [password, setPassword] = useState('');
const [isPasswordValid, setPasswordValid] = useState(false)
const [name, setName] = useState('')
const [isNameValid, setNameValid] = useState(false)

const required = (value) => {
    // alert(value)
    if (!value) {
        return 'required'
    }
  };


const emailOnChange =(e)=>{

setEmail(e.target.value)
}
const validateEmail = ()=>{
    if(!isEmail(email)){
        // return (<)
    }
}


const passwordOnChange = (e) =>{
    setPassword(e.target.value)
}
const nameOnChange = (e) =>{
    setName(e.target.value);
}

const submitForm = (e)=>{

    e.preventDefault();
    // alert(name+" "+email+" "+password);
    AuthService.registerUser(name,email,password)
    .then((response)=>{
        alert(response.data.message)
    })
    .catch((err)=>{
        alert("Error occured :("+err)
    })
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
                        <h2>Create an Account</h2>
                        <Form onSubmit={submitForm}>
                            <div className="group__input">
                                <Input style={{"border-radius":'5px', "border":"1px solid #637381", "height":"48px", "padding-left":"12px", "padding-right":"12px", "width":"100%"}} type="text" placeholder="Name" onChange={nameOnChange} value={name}
                                name="name"
                                validations={[required]}
                                />
                                {/* <div className="alert alert-danger" role="alert">
                                    This field is required!
                                </div> */}
                            </div>
                            <div className="group__input">

                                <Input style={{"border-radius":'5px', "border":"1px solid #637381", "height":"48px", "padding-left":"12px", "padding-right":"12px", "width":"100%"}} type="text" placeholder="Email address"
                                 onChange={emailOnChange} 
                                 value={email}
                                 name="email"
                                 validations={[required]}
                                 />
                            </div>
                            <div className="group__input">
                                <Input style={{"border-radius":'5px', "border":"1px solid #637381", "height":"48px", "padding-left":"12px", "padding-right":"12px", "width":"100%"}} type="password" placeholder="Password" onChange={passwordOnChange} value={password}/>
                            </div>
                            <div className="group__submit">
                                <input type="submit" value="Create Account"/>
                            </div>                                                                  
                            <div className="create__account">                                        
                                <p>Already registerd? <Link to="login">Login</Link></p>
                            </div>
                        </Form>             
                    </div>                        
                </div>                     
                </div>     
        </div>               
    </div>
    )
}
