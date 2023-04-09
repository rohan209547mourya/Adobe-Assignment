import React, { useEffect, useState } from 'react'
import { fetchFromAPI, createNewPost } from '../../helper/fetchFromAPI'

import classes from '../styles/posts.module.css'
import PostCard from './PostCard';
import CreatePostPopUp from './CreatePostPopUp';

const Posts = () => {

    const [posts, setPosts] = useState([]);    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showPopUp, setShowPopup] = useState(false);

    useEffect(() => {

        const fetchPosts = async () => {

            try {
                const resposne = await fetchFromAPI(`posts?page=${currentPage}`, 'GET');

                if (resposne.code === 200) {
                    setPosts(resposne.data.posts);
                    setTotalPages(resposne.data.pagination.totalPages)
                }


            } catch (error) {
                console.log(error.message);
            }
        }

        fetchPosts();

    } , [ currentPage, showPopUp, setShowPopup])


    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const renderPageNumbers = () => {

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={i === currentPage ? classes.activePage : classes.actions}>
                    <button onClick={() => handlePageClick(i)}>{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
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
            <div className={classes.posts}>
                {
                    posts.map((post) => {
                        return <PostCard key={post._id}  post={post}/>
                    })
                }
            </div>
            <div className={classes.pagination}>
                <ul className={classes.pagination_el}>
                    <li className={currentPage === 1 ? classes.PageDisabled : classes.actions}>
                        <button onClick={() => handlePageClick(currentPage - 1)}>Prev</button>
                    </li>
                        {renderPageNumbers()}
                    <li className={currentPage === totalPages ? classes.PageDisabled : classes.actions}>
                        <button onClick={() => handlePageClick(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </div>

            {

                showPopUp && <CreatePostPopUp popUpHeading={"Create new post"} setShowPopup={setShowPopup} />
            
            }

        </div>
    )
}

export default Posts