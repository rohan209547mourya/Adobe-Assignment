import React from 'react'
import ProfileCard from './ProfileCard'
import classes from '../styles/profile.module.css'

const Profile = () => {
  return (
    <div>
      <ProfileCard />
      <div className={classes.posts}>
        <h1>Posts</h1>

      </div>
    </div>
  )
}

export default Profile