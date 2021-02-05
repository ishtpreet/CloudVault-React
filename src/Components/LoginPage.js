import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isEmail } from 'validator'
import { useFormik } from 'formik';

import AuthService from '../Services/authService';


export default function LoginPage(){
    const [isLoading, setisLoading] = useState(false)
    const [formSubmitError, setFormSubmitError] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory();

    const validate = values =>{
        const errors = {}
        if(!isEmail(values.email)){
            errors.email = 'Please enter a valid email'
        }
        if(!values.password){
            errors.password = 'Required'
        }
        // else if(values.password.length <= 5 ){
        //     errors.password = 'Password must be at least 6 characters.'
        // }
        return errors;
    }
  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validate,
      onSubmit: values => {
          setisLoading(true)
        AuthService.userLogIn(values.email,values.password)
        .then((response)=>{
            setisLoading(false)  
            if(response.data.accessToken){
                localStorage.setItem('user',response.data.accessToken)
                history.push('/dashboard')
            }
            else{
                history.push('/')
            }
  
        })
        .catch((err)=>{
            setisLoading(false)
          setFormSubmitError(true)
          if(err.message=== 'Request failed with status code 403')
          {
            setError('Email or Password is Incorrect')
          }
          else if(err.message === 'Request failed with status code 404'){
            setError('Email Id Not Registered.')
          }
  
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
                            {/* <!-- Login form block --> */}
                            <div className="login__form">
                                <h2>Login to your account</h2>
                                {formSubmitError && <div className='alert alert-danger'>{error}</div>} 
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="group__input">
                                        <input name="email" id="email" type="text" placeholder="Email address" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                                    {formik.touched.email && formik.errors.email ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.email}</div> : null}
                                    </div>
                                    <div className="group__input forgot__pass">

                                        <input name="password" id="password" type="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                                        <Link to="/forget-password">Forgot?</Link>
                                    </div>
                                        { formik.touched.password && formik.errors.password ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.password}</div> : null}
                                    <div className="group__submit">
                                        {/* <input type="submit" value="Login"/> */}
                                        <button type='submit' className='btn btn-primary w-100'> {isLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Log In</span></button>
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