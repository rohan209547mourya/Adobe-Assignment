import React, { useState } from 'react'
import Spinner from './Spinner';
import { fetchFromAPI } from '../../helper/fetchFromAPI'
import Cookies from 'js-cookie'
import classes from '../styles/profile.module.css'
import { useNavigate } from 'react-router-dom';


const ChangeImagePopUp = ({setShowPopup, setImageUrl, user}) => {

    const navigate = useNavigate();    
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendImageUpdateRequest = async (imageURL) => {
        const res = await fetchFromAPI(`users/${user.id}/profile-image`, 'PUT', {
            profileImage: imageURL
        }, {
            'Content-Type': 'application/json',
            'x-auth-token' : Cookies.get('x-auth-token')
        })

    
        setImageUrl(res.data.user.profileImage)
    }


    const handleImageChange = async (event) => {
        event.preventDefault();

        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setImage(file);
        }
    }




    const handleSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'profile');
        data.append('cloud_name', 'ddo7x0lvr');

        try {

            const response = await fetch('https://api.cloudinary.com/v1_1/ddo7x0lvr/image/upload', {
                method: 'POST',
                body: data
            })
        
            response.json()
                .then(res => {
                    setImageUrl(res.url);
                    sendImageUpdateRequest(res.url);
                    
                    setIsLoading(false);
                    setShowPopup(false);
                })
                .catch(err => {
                    console.log(err);
                }
            )
            
        } catch (err) {
            
            console.log(err.message);
        }

        
    }


    



    return (
        <div className={classes.popup}>
            <div className={classes.popupInner}>
                <h3>Upload Image</h3>
                <form>
                    <input type="file" onChange={handleImageChange} required/>
                    <button className={classes.btn_popup} onClick={handleSubmit}> {isLoading ? <Spinner /> : 'Submit'}</button>
                </form>
                <button className={classes.close_btn} onClick={() => setShowPopup(false)}>Close</button>
            </div>
        </div>
    )
}

export default ChangeImagePopUp