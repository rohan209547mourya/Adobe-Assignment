import React, { useState } from 'react'
import Spinner from '../profile/Spinner'
import classes from '../styles/profile.module.css'
import { createNewPost } from '../../helper/fetchFromAPI'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const CreatePostPopUp = ({postId, setShowPopup, popUpHeading, setPosts, posts}) => {

    const [content, setFormData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputFiledChange = (e) => {
        setFormData(e.target.value);
     }


    const handleAddNewPost = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        const data = {
            content : content
        }

        if(popUpHeading === 'Create new post') {            
            try {
                
                const res = await createNewPost(data);

                if (res.code === 201) {
                    toast.success(res.message)

                    setIsLoading(false)
                    setShowPopup(false) 
                    setPosts([res.data.post, ...posts]); 
                }

            } catch (err) {
                
            } 
        }
        else{

            data._id = postId;

            try {
                const res = await createNewPost(data, true);

                if (res.code === 200) {

                    toast.success(res.message)
                    
                    window.location.reload();
                    setIsLoading(false)
                    setShowPopup(false)
                }
            } catch (err) {
                
            }
        }
    }


    return (
        <div className={classes.popup} >
            <div className={classes.popupInner} style={{width: '30%', height:'fit-content'}}>
                <h3>{popUpHeading}</h3>
                <form >
                    <div>
                        <textarea type="text" name='content' placeholder='Post Content:' onChange={handleInputFiledChange} value={content} />
                    </div>
                    <div>
                        <button className={classes.btn_popup} style={{width: '70%'}} onClick={handleAddNewPost}> {isLoading ? <Spinner /> : 'Submit'}</button>
                    </div>
                </form>
                <button className={classes.close_btn} onClick={() => setShowPopup(false)}>Close</button>
            </div>
            <ToastContainer />
        </div>

    )
}

export default CreatePostPopUp