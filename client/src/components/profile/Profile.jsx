import React from 'react'
import ProfileCard from './ProfileCard'
import classes from '../styles/profile.module.css'

const Profile = () => {

    const handleCreateNewPost = () => {
        console.log('Create new post')
    }


    return (
        <div>
            <ProfileCard />
            <div className={classes.posts}>
                <div className={classes.header}>
                    <div>
                        <h1>Posts</h1>
                    </div>
                    <div>
                        <span onClick={handleCreateNewPost}>
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile