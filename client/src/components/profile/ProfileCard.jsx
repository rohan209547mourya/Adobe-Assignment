import React, { useEffect, useState } from 'react'
import classes from '../styles/profile.module.css'
import { fetchFromAPI } from '../../helper/fetchFromAPI'
import Cookies from 'js-cookie'
import ChangeImagePopUp from './ChangeImagePopUp';
import EditDetailsPopUp from './EditDetailsPopUp';
import { useNavigate } from 'react-router-dom';


const ProfileCard = () => {

    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [imageUrl, setImageUrl] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNr-hLDsgpEryNGNOs_yJIg4lYCqjBS_ck5dMDD5kBUw&usqp=CAU&ec=48665699");
    const [showSetting, setShowSetting] = useState(false);


    const [user, setUser] = useState({
        id: null,
        name: null,
        email: null,
        bio: null,
        profileImage: null
    })


    const handleDeleteAccount = async () => {

        const isSure = window.confirm("Are you are? You want to delete your account?");

        if (!isSure) {

            setShowSetting(false);
        }
        else{

            const res = await fetchFromAPI(`users/${user.id}`, 'DELETE', null, {
                'x-auth-token': Cookies.get('x-auth-token')
            })
    
            if (res.code === 200) {
                Cookies.remove('x-auth-token');
                navigate('/')
            }
        }


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
    }, [setUser])


    return (
        <>  
            <div className={classes.card}>
                <div className={classes.cover_photo}>
                    <img src={user.profileImage || imageUrl} className={classes.profile} />
                </div>
                <div className={classes.info}>
                    <div>
                        <h3 className={classes.profile_name}>{ user.name || "James Carson"} {"    "} 
                            <span onClick={() => setShowSetting(!showSetting)}>
                                <i className="fa-solid fa-gear"></i>
                            </span>
                        </h3>
                    </div>
                    <div>
                        <p className={classes.about}>{user.bio || "Add Your Bio"}</p>
                    </div>
                    <div >
                        <button className={classes.btn} onClick={() => setShowPopup1(true)}>Edit Profile</button>
                        <button className={classes.btn} onClick={() => setShowPopup(true)}>Change Image</button>
                    </div>
                </div>
                {
                    showPopup && <ChangeImagePopUp user={user} setShowPopup={setShowPopup} setImageUrl={setImageUrl}/>
                }
                {
                    showPopup1 && <EditDetailsPopUp fetchFromAPI={fetchFromAPI} user={user} setUser={setUser} setShowPopup1={setShowPopup1}/>
                }
            </div>

            {
                showSetting && (
                    <div className={classes.popup}>
                        <div className={classes.popupInner}>
                            <div className={classes.setting}>
                                <button className={classes.deleteBtn} onClick={handleDeleteAccount}>
                                    Delete Account
                                </button>
                                <button onClick={() => setShowSetting(!showSetting)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div> 
                )
            }
        </>
    )
}

export default ProfileCard