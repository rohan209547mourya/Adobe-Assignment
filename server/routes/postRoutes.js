const express = require('express');
const router = express.Router();
const {
    createNewPostHandler,
    getAllPostsHandler,
    getPostByIdHandler,
    updatePostContentByIdHandler,
    deletePostByIdHandler,
    incrementLikeCountByIdHandler,
    decrementLikeCountByIdHandler
} = require('../controller/postController');
const authorizarion = require('../middleware/authorization');



/**
 * @route /posts
 * @method POST
 * @description create new post
 */
router.post('/', authorizarion('user'), createNewPostHandler);



/**
 * @route /posts
 * @method GET
 * @description get all posts create by users
 */
router.get('/', getAllPostsHandler);



/**
 * @route /posts/:id
 * @method GET
 * @description get post by id
 */
router.get('/:id', authorizarion('admin') ,getPostByIdHandler);



/**
 * @route /posts/:id
 * @method PUT
 * @description update post content by id
 */
router.put('/:id', authorizarion('user'), updatePostContentByIdHandler);



/**
 * @route /posts/:id
 * @method DELETE
 * @description delete a post by id
 */
router.delete('/:id', authorizarion('user'), deletePostByIdHandler);



/**
 * @route /posts/:id/like
 * @method POST
 * @description increase post like count by 1
 */
router.post('/:id/like', authorizarion('user'), incrementLikeCountByIdHandler);



/**
 * @route /posts/:id/unlike
 * @method POST
 * @description decrease post like count by 1, the like count should not go below zero
 */
router.post('/:id/unlike', authorizarion('user'), decrementLikeCountByIdHandler);


module.exports = router