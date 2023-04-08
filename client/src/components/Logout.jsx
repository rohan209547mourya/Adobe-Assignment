import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


const Logout = () => {

    const navigate = useNavigate();

    useEffect(() =>{
        setTimeout(() => {
            Cookies.remove('x-auth-token');
            navigate('/');
        }, 1000)
    }, []) 
    return (
    <></>
    )
}

export default Logout