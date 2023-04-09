const { Post, validatePost } = require('../model/PostModel')




// Create new post 
const createNewPostHandler = async(req, res) => {

    const user = req.user;
    console.log(user._id);
    const requestData = req.body;

    requestData.user_id = user._id

    let isDataValid = false;

    try {
        isDataValid = validatePost(requestData);
    }
    catch (err) {
        next(err);
    }

    if (isDataValid.error) {
        return res.status(400).json({
            status: "Bad Request",
            code: 400,
            message: isDataValid.error.details[0].message
        })
    }

    const post = new Post({
        user_id: user._id,
        content: requestData.content,
        likes: 0
    })

    try {
        await post.save();
    }
    catch (err) {
        next(err);
    }


    res.status(201).json({
        message: "Post has been created successfully",
        code: 201,
        data: {
            post: {
                _id: post._id,
                user_id: post.user_id,
                content: post.content,
                created_at: post.created_at,
                likes: post.likes
            }
        }
    })
}


// Get all posts
const getAllPostsHandler = async(req, res) => {

    const posts = await Post.find()
                            .sort({ created_at: -1 })
                                .populate('user_id', 'name profileImage');;

    res.status(200).json({
        message: "All posts have been fetched successfully",
        code: 200,
        data: {
            posts: posts
        }
    })
}


// Get post by ids
const getPostByIdHandler = async(req, res) => {
}


// update post content by id
const updatePostContentByIdHandler = async(req, res) => {
}


// delete post by id
const deletePostByIdHandler = async(req, res) => {
}


// Increment the like count of a post by id.
const incrementLikeCountByIdHandler = async(req, res) => {
}

// Decrement the like count of a post by id. The count should not go below 0
const decrementLikeCountByIdHandler = async(req, res) => {
}


module.exports = {
    createNewPostHandler,
    getAllPostsHandler,
    getPostByIdHandler,
    updatePostContentByIdHandler,
    deletePostByIdHandler,
    incrementLikeCountByIdHandler,
    decrementLikeCountByIdHandler
}