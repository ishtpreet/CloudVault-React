import React, { useState } from 'react';
import { isEmail } from 'validator'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import authService from '../Services/authService';
 //TO send email

export default function ForgotPassword() {
    const [isLoading, setisLoading] = useState(false)
    const [show, setShow] = useState(false)

    const validate = values =>{
        const errors = {}
        if(!isEmail(values.email)){
            errors.email = 'Please enter a valid email'
        }
        return errors;
    }
  
    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validate,
      onSubmit: values => {
          setisLoading(true)
         authService.resetPassword(values.email)
        .then((response)=>{
            setisLoading(false)  
            if(response.data.message === 'e-Mail Sent!'){
                setisLoading(false)
                document.getElementById("fogotPassForm").style.display = 'none'
                setShow(true)
            }
  
        })
        .catch((err)=>{
            setisLoading(false)  
            document.getElementById("fogotPassForm").style.display = 'none'
            setShow(true)
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
                          <div className="forgotpass__form" id="fogotPassForm">
                                <h2>Forgot your password?</h2>
                                <p>Type in your email address and we’ll send you instructions to reset your password.</p>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="group__input">
                                        <input type="text" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="Email address"/>
                                        {formik.touched.email && formik.errors.email ? <div className="alert alert-danger" style={{padding: "5px 6px"}}>{formik.errors.email}</div> : null}
                                    </div>
                                    <div className="group__submit">
                                    <button type='submit' className='btn btn-primary w-100'> {isLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Submit</span></button>
                                    </div>
                                </form>
                            </div>

                            {show && <div className="checkemail__pass">
                                <h2>Check your email</h2>
                                <p>If the email address matches any in our database, we’ll send you an email with instructions on how to reset your password</p>
                                <div className="create__account">                                        
                                <p><Link to="/login">Go Back </Link></p>
                            </div>
                            </div>}
                                      
        </div>
        </div>
        </div>
        </div>
    )
}
