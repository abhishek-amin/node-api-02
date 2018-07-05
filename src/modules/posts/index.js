const PostsController = require('./posts.controller');

module.exports = (app) => {
	app.get(		'/api/posts', PostsController.getPosts);
	app.post(		'/api/posts', PostsController.makeNewPost); // create new Post
	// app.put(		'/api/posts/:id', PostsController.editPost); // edit Post
	app.delete(	'/api/posts/:id', PostsController.deletePost); // delete Post
};