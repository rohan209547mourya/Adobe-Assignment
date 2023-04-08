import React, { useState } from 'react'

import classes from '../styles/login.module.css'

const LoginForm = () => {

    const [togglePasswordVisible, setTogglePassword] = useState(false);

    const showPasswordHandler = () => {
        setTogglePassword(!togglePasswordVisible);
    }

    return (
        <div>
            <form>
                <div>
                    <h1 className={classes.title}>Login</h1>
                </div>
                <div>
                    <div className={classes.input_field}>
                        <input type="email" id="email" required />
                        <label htmlFor="email">Your Email:</label>
                    </div>
                    <div className={classes.input_field}>
                        <input type={togglePasswordVisible ? "text" : "password"} id="password" required />
                        <label htmlFor="password">Your Password:</label>
                        <span onClick={showPasswordHandler}>
                            {
                                togglePasswordVisible ?
                                 <i className="fas fa-eye-slash"></i> : 
                                 <i className="fas fa-eye"></i>
                            }
                        </span>
                    </div>
                    <div className={classes.form_btn}>
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm