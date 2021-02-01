import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator'
import { useFormik } from 'formik';

import AuthService from '../Services/authService';
import "bootstrap/dist/css/bootstrap.min.css";
export default function SignUp() {
const [isLoading, setisLoading] = useState(false)
const [formSubmit, setFormSubmit] = useState(false)
const [success, setSuccess] = useState()
const [emailError, setEmailError] = useState(false)

  const validate = values =>{
      const errors = {}
      if(!values.name.trim()){
          errors.name = 'Required'
      }
      else if(values.name.length > 15){
          errors.name = 'Must be 15 characters or less.'
      }
      if(!isEmail(values.email)){
          errors.email = 'Please enter a valid email'
      }
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
      name: '',
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
        setisLoading(true)
      AuthService.registerUser(values.name,values.email,values.password)
      .then((response)=>{
          if(response.data.message === 'Email-ID already registered!')
          {
              setEmailError(true)
            //   setFormSubmit(true)
            //   setError('Email-ID already registered!')
            }
          else{
              
              setSuccess(true)
              setFormSubmit(true)
          }
          setisLoading(false)  

      })
      .catch((err)=>{
        setisLoading(false)  
        setFormSubmit(true)
        setSuccess(false)

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
                    {formSubmit ? [(success?<div className='alert alert-success'>Account Created Successfully<br /><Link to='/login'>Click Here.</Link> to Login</div>:<div className='alert alert-danger'>Error Occured, Please Try again</div>)]: (
                    
                    <div className="login__form">
                        <h2>Create an Account</h2>
                        <form onSubmit={formik.handleSubmit}>
                        
                            <div className="group__input">
                                <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Name" onBlur={formik.handleBlur}/>
                                {formik.touched.name && formik.errors.name ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.name}</div> : null}
                            </div>
                            <div className="group__input">

                            <input type="text" placeholder="Email address"
                                onChange={formik.handleChange} 
                                value={formik.values.email}
                                id="email" name="email"
                                onBlur={formik.handleBlur}
                            />
                            {emailError ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>Email Already registered. Proceed with Login</div> : null}
                            {formik.touched.email && formik.errors.email ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.email}</div> : null}
                            </div>
                            <div className="group__input">
                                <input type="password" name="password" id="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                                {formik.touched.password && formik.errors.password ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.password}</div> : null}
                            </div>
                            <div className="group__submit">
                                {/* <input type="submit" value="Create Account"/> */}
                                <button type='submit' className='btn btn-primary w-100'> {isLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Create Account</span></button>
                            </div>                                                                  
                            <div className="create__account">                                        
                                <p>Already registerd? <Link to="login">Login</Link></p>
                            </div>
                        </form>             
                    </div>                        
                    
                    ) }
                </div>                     
                </div>     
        </div>               
    </div>
    )
}
