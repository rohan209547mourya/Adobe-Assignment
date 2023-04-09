const { Post, validatePost } = require('../model/PostModel')
const { User } = require('../model/UserModel')




// Create new post 
const createNewPostHandler = async(req, res) => {

    const user = req.user;
    
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
        await post.save()
    }
    catch (err) {
        next(err);
    }


    let tempUser = null;
    try {
      tempUser = await User.findOne({_id: user._id});
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
                user_id: {
                    _id: tempUser._id,
                    name: tempUser.name,
                    profileImage: tempUser.profileImage
                },
                content: post.content,
                created_at: post.created_at,
                likes: post.likes
            }
        }
    })
}


// Get all posts
const getAllPostsHandler = async(req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);
    const offset = (page - 1) * limit;

    const posts = await Post.find()
                            .sort({ created_at: -1 })
                            .skip(offset)
                            .limit(limit)
                            .populate('user_id', 'name profileImage');;

    res.status(200).json({
        message: "All posts have been fetched successfully",
        code: 200,
        data: {
            posts: posts,
            pagination: {
                totalPosts: totalPosts,
                totalPages: totalPages,
                currentPage: page,
            }
        }
    })
}


// Get all posts made by a user
const getAllPostsByUserIdHandler = async(req, res) => {
 
    const user = req.user;
    const posts = await Post.find({user_id: user._id})
                                .sort({ created_at: -1 })
                                .populate('user_id', 'name profileImage');

    res.status(200).json({
        message: "All posts have been fetched successfully",
        code: 200,
        data: {
            posts: posts,
        }
    })
}


// Get post by ids
const getPostByIdHandler = async(req, res) => {

    const post = await Post.findById(req.params.id)
                            .populate('user_id', 'name profileImage');

    if (!post) {
        return res.status(404).json({
            status: "Not Found",
            code: 404,
            message: "Post not found"
        })
    }

    res.status(200).json({
        message: "Post has been fetched successfully",
        code: 200,
        data: {
            post: post
        }
    })

}


// Update post content by id
const updatePostContentByIdHandler = async (req, res, next) => {
    const postId = req.params.id;
    const { content } = req.body;

    try {
        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { content: content, updated_at: new Date() },
            { new: true }
        ).populate('user_id', 'name profileImage');

        if (!post) {
            return res.status(404).json({
                status: "Not Found",
                code: 404,
                message: "Post not found"
            })
        }

        res.status(200).json({
            message: "Post content has been updated successfully",
            code: 200,
            data: {
                post: post
            }
        });
    } catch (error) {
        next(error);
    }
}



// Delete post by id
const deletePostByIdHandler = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const post = await Post.findOneAndDelete({ _id: postId })
        .populate('user_id', 'name profileImage');

        if (!post) {
            return res.status(404).json({
                status: "Not Found",
                code: 404,
                message: "Post not found"
            })
        }

        res.status(200).json({
            message: "Post has been deleted successfully",
            code: 200,
            data: {
                post: post
            }
        });
    } catch (error) {
        next(error);
    }
}



// Increment the like count of a post by id.
const incrementLikeCountByIdHandler = async (req, res, next) => {
    const postId = req.params.id;
    let user = req.user;

    try {
        user = await User.findById(user._id);

        if (user.likedPosts?.includes(postId)) {
            return res.status(400).json({
                status: "Bad Request",
                code: 400,
                message: "User has already liked this post"
            });
        }
    
        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { $inc: { likes: 1 } },
            { new: true }
        ).populate('user_id', 'name profileImage');
    
        if (!post) {
            return res.status(404).json({
                status: "Not Found",
                code: 404,
                message: "Post not found"
            })
        }
    
        user.likedPosts.push(postId);
        await user.save();
    
        res.status(200).json({
            message: "Post like count has been incremented successfully",
            code: 200,
            data: {
                post: post
            }
        });
    } catch (error) {
        next(error);
    }
    
}



// Decrement the like count of a post by id. The count should not go below 0
const decrementLikeCountByIdHandler = async (req, res, next) => {
    const postId = req.params.id;
    let user = req.user;

    try {

        user = await User.findById(user._id);

        if (user.likedPosts?.includes(postId)) {
            user.likedPosts = user.likedPosts.filter(post => post != postId);
            await user.save();
        }
    

        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { $inc: { likes: -1 } },
            { new: true }
        ).populate('user_id', 'name profileImage');


        if(post.likes < 0) {
            post.likes = 0;
            await post.save();
        }

        if (!post) {
            return res.status(404).json({
                status: "Not Found",
                code: 404,
                message: "Post not found"
            })
        }

        res.status(200).json({
            message: "Post like count has been decremented successfully",
            code: 200,
            data: {
                post: post
            }
        });
    } catch (error) {
        next(error);
    }
}



module.exports = {
    createNewPostHandler,
    getAllPostsHandler,
    getPostByIdHandler,
    updatePostContentByIdHandler,
    deletePostByIdHandler,
    incrementLikeCountByIdHandler,
    decrementLikeCountByIdHandler,
    getAllPostsByUserIdHandler
}