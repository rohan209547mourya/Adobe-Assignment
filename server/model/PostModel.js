const mongoose = require('mongoose');
const Joi = require('joi')



const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        min: 0,
        default: 0,
    },
});


const validatePost = (post) => {

    const schema = Joi.object({
        user_id: Joi.string().required(),
        content: Joi.string().min(1).max(300).required(),
        likes: Joi.number().min(0),
    });
    return schema.validate(post);
}


const Post = mongoose.model('Post', postSchema);

module.exports = Post;

