import React, { useState, useEffect } from 'react'
import {useFormik} from 'formik';
import { Link } from 'react-router-dom';
import {Spinner, Alert} from 'react-bootstrap'

import AuthService from '../Services/authService';

export default function Fpass({match}) {
    const [useeffLoading, setuseeffLoading] = useState(true)
    const [isValidToken, setIsValidToken] = useState(false)
    const [isLoading,setisLoading] = useState(false);
    const [email,setEmail] = useState('');
    const [name, setName] = useState('');
    const [show, setShow] = useState(false)

    useEffect(()=>{
        setuseeffLoading(true)
        // alert(match.params.token)
        var token = match.params.token;
        AuthService.verifyPasswordResetToken(token)
        .then((response)=>{
            // alert(response)
            if(response.data.message ==='Valid!'){
                setIsValidToken(true)
                setuseeffLoading(false)
                setEmail(response.data.email)
                setName(response.data.name)
            }
        })
        .catch(()=>{
            setuseeffLoading(false)

        })
    },[])

    const validate = values =>{
        const errors = {}
        if(!values.password){
            errors.password = 'Required'
        }
        else if(values.password.length <= 5 ){
            errors.password = 'Password must be at least 6 characters.'
        }
        return errors;
    }
  
    const formik = useFormik({
      initialValues: {
        password: '',
      },
      validate,
      onSubmit: values => {
          setisLoading(true)
        // AuthService.userLogIn(values.email,values.password)
        .then((response)=>{
            setisLoading(false)  
            if(response.data.accessToken){
                localStorage.setItem('user',response.data.accessToken)
                // history.push('/dashboard')
            }
            else{
                // history.push('/')
            }
  
        })
        .catch((err)=>{
            setisLoading(false)
        //   setFormSubmitError(true)
        //   if(err.message=== 'Request failed with status code 403')
        //   {
        //     setError('Email or Password is Incorrect')
        //   }
        //   else if(err.message === 'Request failed with status code 404'){
        //     setError('Email Id Not Registered.')
        //   }
  
        })
      },
    });

    return (
           <div>
              <div className="sign__back">

                <div className="login__block">


                <div className="login__inner">

                    <div className="login__logo">
                        <img src="/images/icon.png" alt="logo"/>
                    </div>
                    {useeffLoading && <Spinner animation="border"/>}
                   {(!useeffLoading && isValidToken) ? <div className="forgotpass__form" id="fogotPassForm">
                    <h2>Hola {name}</h2>
                        <p>Type in your new password for {email}</p>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="group__input">
                                <input type="password" id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Enter New Password"/>
                                {formik.touched.password && formik.errors.password ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.password}</div> : null}
                                </div>
                            <div className="group__submit">
                            <button type='submit' className='btn btn-primary w-100'> {isLoading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit</span></button>
                            </div>
                            </form>
                        </div> : <Alert variant='danger'>
                            Link is Not valid or has expired.<br/>
                            <Alert.Link><Link to="/login">Go Back</Link></Alert.Link>
                        </Alert>}


                            {show && <div className="checkemail__pass">
                                <h2>Password Reset Successfull</h2>
                                <p><Link to="/login">Login</Link> Now</p>
                            </div>}
                                      
                    </div>
               </div>
            </div>
        </div>
    )
}
