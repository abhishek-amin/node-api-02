const Posts = require('./posts.model');
const Users = require('../users/users.model');
const dateFormat = require('dateformat');

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
      await Users.findByIdAndUpdate({_id: newPost.userId}, {"$push": { posts: post}})
      res.status(201).json(post);
    } catch (err) {
      res.status(404).json({errorMessage: "Something went wrong."});
    }
  }

  static async deletePost (req, res) {
    try {
      const post = await Posts.findByIdAndRemove(req.params.id)
      await Users.findByIdAndUpdate(post.userId, {"$pull": {posts: post._id}})
      res.status(200).json({message: 'post removed successfully.'})
    } catch (err) {
      res.status(404).send(err)
    }
  }
}

module.exports = PostsController;