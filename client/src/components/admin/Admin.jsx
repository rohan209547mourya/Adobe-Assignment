import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../../helper/fetchFromAPI';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Admin = () => {

    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [topFiveActiveUsers, setTopFiveActiveUsers] = useState([]);
    const [topFiveLikedPosts, setTopFiveLikedPosts] = useState([]);

    useEffect(() => {

        const fetchNumberOfUsers = async () => {

            const res = await fetchFromAPI('analytics/users' , 'GET', null, {
                'Content-Type': 'application/json',
                'x-auth-token': Cookies.get('x-auth-token')
            })
    
            setNumberOfUsers(res.total);
        }

        const fetchTopFiveActiveUsers = async () => {

            const res = await fetchFromAPI('analytics/users/top-active' , 'GET', null, {
                'Content-Type': 'application/json',
                'x-auth-token': Cookies.get('x-auth-token')
            })
    
            setTopFiveActiveUsers(res)
        }

        const fetchNumberOfPosts = async () => {

            const res = await fetchFromAPI('analytics/posts' , 'GET', null, {
                'Content-Type': 'application/json',
                'x-auth-token': Cookies.get('x-auth-token')
            })
        
            setNumberOfPosts(res.total);
        }


        const fetchTopFiveLikedPosts = async () => {
                
                const res = await fetchFromAPI('analytics/posts/top-liked' , 'GET', null, {
                    'Content-Type': 'application/json',
                    'x-auth-token': Cookies.get('x-auth-token')
                })
                setTopFiveLikedPosts(res);
        }

        fetchNumberOfUsers();
        fetchTopFiveActiveUsers();
        fetchNumberOfPosts();
        fetchTopFiveLikedPosts();
    }, [])

  return (
    <div>
        <div>
            <h2>Total number of users : {numberOfUsers}</h2>
        </div>
        <div>
            <h2>Total number of posts : {numberOfPosts}</h2>
        </div>

        <div>
            <h2>Top 5 Active users: </h2>
            <div style={{display: 'flex'}}> 
                {
                    topFiveActiveUsers.map((user) => {
                        return (
                            <div style={{padding: '10px', marginLeft: '10px'}} key={user._id}>
                                <h3>{user.name}</h3>
                                <h3>{user.email}</h3>
                                <h3>{user.postCount}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div>
            <h2>Top 5 Liked Posts: </h2>
            <div style={{display: 'flex'}}> 
                {
                    
                    topFiveLikedPosts.map((post) => {

                        return (
                            <div style={{padding: '10px', marginLeft: '10px'}} key={post._id}>
                                <h3>{post.content}</h3>
                                <h3>Likes: {post.likeCount}</h3>
                            </div>
                        )
                    })

                }
            </div>
        </div>
        <div>
            <h1>
                <Link to='/logout'>logout</Link>
            </h1>
        </div>
    </div>
  )
}

export default Admin