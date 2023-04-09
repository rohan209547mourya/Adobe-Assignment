const express = require('express');
const router = express.Router();
const {User} = require('../model/UserModel');
const {Post} = require('../model/PostModel');
const authorization = require('../middleware/authorization');

// GET /analytics/users: Retrieve the total number of users.
router.get('/users', authorization('admin'), async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ total: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /analytics/users/top-active: Retrieve the top 5 most active users, based on the number of posts.
router.get('/users/top-active', authorization('admin'), async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'user_id',
          as: 'posts',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          postCount: { $size: '$posts' },
        },
      },
      { $sort: { postCount: -1 } },
      { $limit: 5 },
    ]);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /analytics/posts: Retrieve the total number of posts.
router.get('/posts', authorization('admin'), async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json({ total: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /analytics/posts/top-liked: Retrieve the top 5 most liked posts.
router.get('/posts/top-liked', authorization('admin'), async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $project: {
          _id: 1,
          content: 1,
          user_id: 1,
          likeCount:  '$likes' ,
        },
      },
      { $sort: { likeCount: -1 } },
      { $limit: 5 },
    ]);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
