const Posts = require('./posts.model');
const Users = require('../users/users.model');
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
        userId: req.body.userId,
        content: req.body.content,
        timeStamp: dateFormat()
      }

      const user = await Users.findOne({_id: req.body.userId})
      newPost.userName = user.name;

      const post = await Posts(newPost);
      await post.joiValidate(newPost);
      await post.save();
      console.log(newPost.userId);
      await Users.findByIdAndUpdate({_id: newPost.userId}, {"$push": { posts: post}})
      res.status(201).json(post);
    } catch (err) {
      console.log(err);
      res.status(404).json({errorMessage: "Something went wrong."});
    }
  }

  static async deletePost (req, res) {
    try {
      await Posts.findByIdAndRemove({_id: req.params._id})
      await Users.findByIdAndUpdate({_id: newPost.userId}, {"$pop": { posts: post}})
      res.status(200).json({message: 'post removed successfully.'})
    } catch (err) {
      res.status(404).json(err)
    }
  }
}

module.exports = PostsController;