const Posts = require('./posts.model');
const Users = require('../users/users.model');
const UsersController = require('../users/users.controller');
const dateFormat = require('dateformat');

// class for posts methods
class PostsController {
  static async getPosts (req, res) {
    try {
      const allPosts = await Posts.find({});
      const result = {};
      result.docs = allPosts;
      result.total = allPosts.length;
      res.status(200).json(result);
    } catch (err) {
      res.status(404).json({errorMessage: "Something went wrong."});
    }
  }

  static async makeNewPost (req, res) {
    try {
      const newPost = {
        user: req.body.user,
        content: req.body.content,
        timeStamp: dateFormat()
      }
      console.log(1);
      const post = await Posts(newPost);
      console.log(2);
      await post.joiValidate(newPost);
      console.log(3);
      await post.save();
      console.log(newPost.user);
      console.log('#')
      await Users.findByIdAndUpdate({_id: newPost.user}, {"$push": { posts: post} })
      console.log(4);
      res.status(201).json(post);
      console.log(1);
    } catch (err) {
      console.log(err);
      res.status(404).json({errorMessage: "Something went wrong."});
    }
  }
}

module.exports = PostsController;