const PostsController = require('./posts.controller');

module.exports = (app) => {
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "*");
		next();
	});

	// routes for Post
	app.get(		'/api/posts', PostsController.getPosts);
	app.post(		'/api/posts', PostsController.makeNewPost); // create new Post
	// app.put(		'/api/posts/:id', PostsController.editPost); // edit Post
	app.delete(	'/api/posts/:id', PostsController.deletePost); // delete Post
};