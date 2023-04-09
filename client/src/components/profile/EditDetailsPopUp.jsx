import React, { useState } from 'react'
import Spinner from './Spinner';
import classes from '../styles/profile.module.css'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const EditDetailsPopUp = ({setShowPopup1, fetchFromAPI, user , setUser}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: null,
        bio: null
    })

    const handleInputFiledChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const showErrorMessage = (message) => {

        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
        })

    }
    


    const handleSubmit = async( event) => {
        event.preventDefault();
        setIsLoading(true);

        if(formData.name  === null && formData.bio  === null){

            setIsLoading(false);

            showErrorMessage('Please enter name or bio! else click on close');
        }
        else{

            try {

                const response = await fetchFromAPI(
                    `users/${user.id}`,
                    'PUT',
                    {
                        name: formData.name,
                        bio: formData.bio
                    },
                    {
                        'Content-Type': 'application/json',
                        'x-auth-token': Cookies.get('x-auth-token')
                    }
                )
    
    
                if(response.code === 200) {  
                    
                    setUser({
                        ...user,
                        name: response.data.user.name,
                        bio: response.data.user.bio
                    })
                    setIsLoading(false);
                    setShowPopup1(false);
                }
                
            } catch (err) {
                console.log(err);
            }
            
        }

        
    }


    return (
        <div className={classes.popup} >
            <div className={classes.popupInner} style={{width: '30%', height:'fit-content'}}>
                <h3>Edit Details</h3>
                <form >
                    <div>
                        <input type="text" name='name' placeholder='Name: ' onChange={handleInputFiledChange} />
                    </div>
                    <div>
                        <textarea type="text" name='bio' placeholder='Bio:' onChange={handleInputFiledChange} value={formData.bio || ""} />
                    </div>
                    <div>
                        <button className={classes.btn_popup} style={{width: '70%'}} onClick={handleSubmit}> {isLoading ? <Spinner /> : 'Submit'}</button>
                    </div>
                </form>
                <button className={classes.close_btn} onClick={() => setShowPopup1(false)}>Close</button>
            </div>

            <ToastContainer />
        </div>
    )
}

export default EditDetailsPopUp