import React, { useEffect, useState }  from 'react';
import classes from '../styles/postcard.module.css'
import { fetchFromAPI } from '../../helper/fetchFromAPI';
import Cookie from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


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
    }

  }

  const showErrorMessage = (message) => {

    toast.error(message, 
      {
        position: toast.POSITION.TOP_CENTER,
      }
    ) ;

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
              <p>an hour ago</p>
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
