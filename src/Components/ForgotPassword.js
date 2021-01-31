import React from 'react'

export default function ForgotPassword() {
    return (
        <div>
              <div className="sign__back">

                <div className="login__block">


                <div className="login__inner">

                    <div className="login__logo">
                        <img src="/images/icon.png" alt="logo"/>
                    </div>
            <div className="forgotpass__form">
                                <h2>Forgot your password?</h2>
                                <p>Type in your email address and we’ll send you instructions to reset your password.</p>
                                <form action="">
                                    <div className="group__input">
                                        <input type="text" placeholder="Email address"/>
                                    </div>
                                    <div className="group__submit">
                                        <input type="submit" value="Submit"/>
                                    </div>
                                </form>
                            </div>

                            <div className="checkemail__pass" style={{display:"none"}}>
                                <h2>Check your email</h2>
                                <p>If the email address matches any in our database, we’ll send you an email with instructions on how to reset your password</p>
                            </div>
                        
        </div>
        </div>
        </div>
        </div>
    )
}
