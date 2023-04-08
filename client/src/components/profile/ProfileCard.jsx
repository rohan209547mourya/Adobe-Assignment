import React, { useEffect, useState } from 'react'
import classes from '../styles/profile.module.css'
import Spinner from './Spinner';
import { fetchFromAPI } from '../../helper/fetchFromAPI'
import Cookies from 'js-cookie'


const ProfileCard = () => {

   
    const [showPopup, setShowPopup] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNr-hLDsgpEryNGNOs_yJIg4lYCqjBS_ck5dMDD5kBUw&usqp=CAU&ec=48665699");
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState({
        id: null,
        name: null,
        email: null,
        bio: null,
        profileImage: null
    })


  
    const handleImageChange = async (event) => {
        event.preventDefault();

        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setImage(file);
        }
    }


    const sendImageUpdateRequest = async () => {
        const res = await fetchFromAPI('users/sdfhlsd/profile-image', 'PUT', {
            profileImage: imageUrl
        }, {
            'Content-Type': 'application/json',
            'x-auth-token' : Cookies.get('x-auth-token')
        })
    }


    const handleSubmit = async (event) => {

        event.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'profile');
        data.append('cloud_name', 'ddo7x0lvr');

        const response = await fetch('https://api.cloudinary.com/v1_1/ddo7x0lvr/image/upload', {
                method: 'POST',
                body: data
            })
        
        response.json()
            .then(res => {
                setImageUrl(res.url);

                sendImageUpdateRequest();
                
                setIsLoading(false);
                setShowPopup(false);
            })
            .catch(err => {
                console.log(err);
            }
        )
    }


    useEffect(() => {
        const fetchUserData = async () => {

            const res = await fetchFromAPI('users', 'GET', null, {
                'x-auth-token' : Cookies.get('x-auth-token')
            })

            if (res.code === 200) {
                const data = res.data.user;
                setUser({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    bio: data.bio,
                    profileImage: data.profileImage
                })
            }

        }

        fetchUserData();
    }, [])


    return (
        <>  
            <div className={classes.card}>
                <div className={classes.cover_photo}>
                    <img src={user.profileImage || imageUrl} className={classes.profile} />
                </div>
                <div className={classes.info}>
                    <div>
                        <h3 className={classes.profile_name}>{ user.name || "James Carson"} {"    "} <span><i class="fa-solid fa-gear"></i></span></h3>
                    </div>
                    <div>
                        <p className={classes.about}>{user.bio || "Add Your Bio"}</p>
                    </div>
                    <div>
                        <button className={classes.btn}>Edit Profile</button>
                        <button className={classes.btn} onClick={() => setShowPopup(true)}>Change Image</button>
                    </div>
                </div>
                {
                    showPopup && (
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
                )}
            </div>
        </>
    )
}

export default ProfileCard