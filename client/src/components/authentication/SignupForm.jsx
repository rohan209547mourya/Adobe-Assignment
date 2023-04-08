import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import classes from '../styles/signup.module.css'
import { fetchFromAPI } from '../../helper/fetchFromAPI'
import { useNavigate } from 'react-router-dom'



const Signup = () => {

    const navigate = useNavigate();

    const [togglePasswordVisible, setTogglePassword] = useState(false);
    const showPasswordHandler = () => {
        setTogglePassword(!togglePasswordVisible);
    }



    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    
    const inputFieldHandler = (e) => {

        const {id, value} = e.target;
        setFormData({
            ...formData,
            [id]: value
        })
    }
    

    const [passwordMatches, setPasswordMatches] = useState(formData.password === formData.confirmPassword);
    useEffect(() => {
        setPasswordMatches(formData.password === formData.confirmPassword);
    }, [ setPasswordMatches, formData.password, formData.confirmPassword ])



    const [passwordValidation, setPasswordValidation] = useState(null);
    useEffect(() => {
        if(formData.password.length >= 6 && formData.password.length <= 16) {
            setPasswordValidation(true);
        }
    }, [formData.password, setPasswordValidation])



    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmitRequest = async (e) => {
        e.preventDefault();

        setIsSubmitting(true)

        const requestData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        }

        const res = await fetchFromAPI('users', 'POST', requestData);
        
        if(res.code === 201) {
            
            const {token} = res;
            Cookie.set('x-auth-token', token);
            navigate('/');
        }
        else{
            showErrorMessage(res.message);
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
        <form onSubmit={handleSubmitRequest} className={classes.signupForm}>
            <div>
                <h1 className={classes.title}>Create Account</h1>
            </div>
            <div>
                <div className={classes.input_field}>
                    <input className={classes.input} type="text" id="name" required  onChange={inputFieldHandler} />
                    <label htmlFor="name">Your Name:</label>
                </div>
                <div className={classes.input_field}>
                    <input className={classes.input} type="text" id="email" required onChange={inputFieldHandler}/>
                    <label htmlFor="email">Your Email:</label>
                </div>
                <div className={classes.input_field}>
                    <input className={classes.input} type={togglePasswordVisible ? "text" : "password"} id="password" onFocus={() => setPasswordValidation(false)} onChange={inputFieldHandler}  required />
                    <label htmlFor="password">Your Password:</label>
                    <span onClick={showPasswordHandler}>
                        {
                            togglePasswordVisible ?
                                <i className="fas fa-eye-slash"></i> : 
                                <i className="fas fa-eye"></i>
                        }
                    </span>
                </div>
                <div className={classes.input_field}>
                    <input type={togglePasswordVisible ? "text" : "password"} id="confirmPassword" onChange={inputFieldHandler} required className={classes.input}  />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <span onClick={showPasswordHandler}>
                        {
                            togglePasswordVisible ?
                                <i className="fas fa-eye-slash"></i> : 
                                <i className="fas fa-eye"></i>
                        }
                    </span>
                </div>
                {
                    !passwordMatches &&
                    <span className={classes.invalid_input}>  
                        <i className="fas fa-exclamation-triangle"></i> Invalid Confirm Password.
                    </span>
                }
                <br />
                {
                    passwordValidation === false &&
                    <span className={classes.invalid_input}>  
                        <i className="fas fa-exclamation-triangle"></i> Password length should be at least 6.
                    </span>
                }
                <div className={classes.form_btn}>
                    <button type="submit" >{!isSubmitting ? 'Create Account' : 'Loading...'}</button>
                </div>
            </div>
        </form>
        <ToastContainer />
    </div>
    )
}

export default Signup