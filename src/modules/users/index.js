const dateFormat = require('dateformat');
const UsersController = require('./users.controller');

module.exports = (app) => {
	app.use(function timeLog (req, res, next){
		console.log(`${dateFormat()} : ${req.method}`);
		next();
	});

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "*");
		next();
	});
	
	// routes for user

	// app.post('/api/signup');
	app.post(		'/api/login', UsersController.login);
	app.get(		'/api/logout', UsersController.logout);
	app.get(		'/api/users', UsersController.getUsers);
	app.post(		'/api/users', UsersController.postNewUser); // create new user
	app.put(		'/api/users/:id', UsersController.editUser); // edit user
	app.delete(	'/api/users/:id', UsersController.deleteUser); // delete user
};