import React, { useState } from 'react'
import classes from '../styles/postcard.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePostPopUp from '../posts/CreatePostPopUp';
import { fetchFromAPI } from '../../helper/fetchFromAPI';
import Cookies from 'js-cookie';
import moment from 'moment'

const PostCard = ({ post, setPosts , posts }) => {

    const [showOptions, setShowOptions] = useState(false);
    const [showPopUp, setShowPopup] = useState(false);


    const handleEditClick = () => {
        setShowOptions(false)
        setShowPopup(true);
    }

    const handleDeleteClick = () => {
        const isSure = window.confirm("Are you sure! you want to delete this post?");

        if(isSure) {

            const deletePost = async () => {
                try {
                    const res = await fetchFromAPI(`posts/${post._id}`, 'DELETE', null, {
                        'Content-Type': 'application/json',
                        'x-auth-token': Cookies.get('x-auth-token')
                    });
    
                    if (res.code === 200) {
                        toast.success(res.message);
                        setShowOptions(false);
                        setPosts(posts.filter((post) => post._id !== res.data.post._id));
                    }
    
                } catch (error) {
                    console.log(error.message);
                }
            }

            deletePost();            

        }
    }

    const formatTimeAgo = (dateString) => {
    
        const date = moment(dateString);
        const now = moment();
        const diff = now.diff(date);
        const duration = moment.duration(diff);
        const years = duration.years();
        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
    
        if (years > 0) {
          return years + " year" + (years === 1 ? "" : "s") + " ago";
        } 
        else if (months > 0) {
          return months + " month" + (months === 1 ? "" : "s") + " ago";
        } 
        else if (days > 0) {
          return days + " day" + (days === 1 ? "" : "s") + " ago";
        } 
        else if (hours > 0) {
          return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
        } 
        else if (minutes > 0) {
          return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
        } 
        else {
          return "just now";
        }
      }
    

  return (
    <div className={classes.card}>
        <div className={classes.post_card_header}>
            <div>
                <div>
                <div className={classes.avatar}>
                    <img src={post.user_id.profileImage} alt="avatar" />
                </div>
                <div className={classes.username}>
                    <h3>{post.user_id.name}</h3>
                    <p>{formatTimeAgo(post.created_at)}</p>
                </div>
                </div>
            </div>
            <div className={classes.action}>
                <span onClick={() => setShowOptions(true)}>
                    <i className="fa-solid fa-ellipsis-vertical"  style={{color: 'black'}}></i>
                </span>
            </div>
            
            <div style={{position: 'relative'}}>
                {
                    showOptions && (
                        <div className={classes.options} style={{ display: 'flex', flexDirection: 'column'}}>
                            <div onClick={handleEditClick}>
                                <span>
                                    <i className="fa-solid fa-edit"></i>
                                </span>
                                <span>Edit</span>
                            </div>
                            <div onClick={handleDeleteClick}>
                                <span>
                                    <i className="fa-solid fa-trash"></i>
                                </span>
                                <span>Delete</span>
                            </div>
                            <div onClick={() => setShowOptions(false)}>
                                <span>
                                    Close
                                </span>
                            </div>
                        </div>
                    
                    )
                }
            </div>
        </div>
        <div className={classes.post_content}>
            <p>{post.content}</p>
        </div>
        <ToastContainer />
        {

            showPopUp && ( <CreatePostPopUp setPosts={setPosts} postId={post._id} popUpHeading={"Edit Post"} setShowPopup={setShowPopup}/>)
        }
    </div>
  )
}

export default PostCard