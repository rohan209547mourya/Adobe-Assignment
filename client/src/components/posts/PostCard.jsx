import React, { useEffect, useState }  from 'react';
import classes from '../styles/postcard.module.css'
import { fetchFromAPI } from '../../helper/fetchFromAPI';
import Cookie from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';



const PostCard = ({ post }) => { 

  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);


  useEffect(() => {

    const fetchUserData = async () => {

      const res = await fetchFromAPI('users' , 'GET', null, {
        'Content-Type': 'application/json',
        'x-auth-token' : Cookie.get('x-auth-token')
      })

      if(res.code === 200) {
        const posts = res.data.user.likedPosts;


        if(posts?.includes(post._id)) {
          setIsLiked(true);
        }
      }
    }

    fetchUserData();
  })


  const handleLikeAction = async() => {

    try {
      const res = await fetchFromAPI(`posts/${post._id}/like`, 'POST', null, {
        'Content-Type': 'application/json',
        'x-auth-token' : Cookie.get('x-auth-token')
      });

      if(res.code === 200) {
        window.location.reload()
      }

      else{

        if(res.message === "Invalid token") {
          navigate('login')
        }

        showErrorMessage(res.message)
      }
    } catch (err) { 

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
  
  

  const handleDisLikeAction = async () => {
    
    try {
      const res = await fetchFromAPI(`posts/${post._id}/unlike`, 'POST', null, {
        'Content-Type': 'application/json',
        'x-auth-token' : Cookie.get('x-auth-token')
      });
      
      if(res.code === 200) {
        window.location.reload()
      }
      else{

        if(res.message === "Invalid token") {
          navigate('login')
        }

        showErrorMessage(res.message)
      }
    } catch (err) { 
      showErrorMessage(err.message);
    }

  }

  const showErrorMessage = (message) => {

    toast.error(message, 
      {
        position: toast.POSITION.TOP_CENTER,
      }
    ) ;
  }

  console.log(post);

  return (
    <div className={classes.card}>
      <div className={classes.post_card_header}>
        <div>
          <div>
            <div className={classes.avatar}>
              <img src={post.user_id.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNr-hLDsgpEryNGNOs_yJIg4lYCqjBS_ck5dMDD5kBUw&usqp=CAU&ec=48665699"} alt="avatar" />
            </div>
            <div className={classes.username}>
              <h3>{post.user_id.name}</h3>
              <p>{formatTimeAgo(post.created_at)}</p>
            </div>
          </div>
        </div>
        <div className={classes.action}>
            <span onClick={handleLikeAction} className={isLiked ? classes.liked : ""}> 
              <i className="fa-solid fa-thumbs-up"></i> 
              <span>{post.likes}</span> 
            </span>
            <span onClick={handleDisLikeAction}>
              <i className="fa-solid fa-thumbs-down"></i>
            </span>
        </div>
      </div>
      <div className={classes.post_content}>
        <p>{post.content}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PostCard;
