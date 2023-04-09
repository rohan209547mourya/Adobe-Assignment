import React, { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import classes from '../styles/profile.module.css'
import CreatePostPopUp from '../posts/CreatePostPopUp';
import { fetchFromAPI } from '../../helper/fetchFromAPI';
import Cookies from 'js-cookie';
import PostCard from './PostCard';

const Profile = () => {

    const [posts, setPosts] = useState([]);
    const [showPopUp, setShowPopup] = useState(false);

 

    useEffect(() => {

        const fetchPosts = async () => {

            try {
                const resposne = await fetchFromAPI(`posts/user/all`, 'GET', null, {
                    'Content-Type': 'application/json',
                    'x-auth-token': Cookies.get('x-auth-token')
                });

                if (resposne.code === 200) {
                    setPosts(resposne.data.posts);
                }


            } catch (error) {
                console.log(error.message);
            }
        }

        fetchPosts();

    } , [])


    return (
        <div>
            <ProfileCard />
            <div className={classes.posts}>
                <div className={classes.header}>
                    <div>
                        <h1>Posts</h1>
                    </div>
                    <div>
                        <span onClick={() => setShowPopup(true)}>
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                    </div>
                </div>
                <div className={classes.profile_posts}>
                    {
                        posts.map((post) => {
                            return <PostCard key={post._id} setPosts={setPosts} posts={posts} post={post}/>
                        })
                    }

                </div>
            </div>
            {
                showPopUp && <CreatePostPopUp popUpHeading={"Create new post"} setPosts={setPosts} posts={posts} setShowPopup={setShowPopup} />
            }
        </div>
    )
}

export default Profile