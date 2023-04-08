import React, { useState } from 'react'
import { fetchFromAPI } from '../../helper/fetchFromAPI'
import Cookie from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import classes from '../styles/login.module.css'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate();

    const [togglePasswordVisible, setTogglePassword] = useState(false);

    const showPasswordHandler = () => {
        setTogglePassword(!togglePasswordVisible);
    }

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputData = (e) => {
        const { id, value } = e.target;

        setFormData({
            ...formData,
            [id]: value
        })
    }

    const [ isSubmitting, setIsSubmitting ] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const res = await fetchFromAPI('users/auth/login', 'POST', formData);

        if(res?.code === 200) {
            Cookie.set('x-auth-token', res.token);
            console.log(res.data);
            navigate('/')
        }
        else{
            showErrorMessage(res?.message);
            setIsSubmitting(false);
        }
    }



    const showErrorMessage = (message) => {

        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
        })
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.loginForm}>
                <div>
                    <h1 className={classes.title}>Login</h1>
                </div>
                <div>
                    <div className={classes.input_field}>
                        <input className={classes.input} type="text" id="email" required  onChange={handleInputData}/>
                        <label htmlFor="email">Your Email:</label>
                    </div>
                    <div className={classes.input_field}>
                        <input className={classes.input} type={togglePasswordVisible ? "text" : "password"} id="password" onChange={handleInputData} required />
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
                        <button type="submit">{isSubmitting ? "Loading..." : "Login"}</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default LoginForm