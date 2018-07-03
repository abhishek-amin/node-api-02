const dateFormat = require('dateformat');
const UserController = require('./user.controller');

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
	app.get(		'/api/users', UserController.getUsers);
	app.post(		'/api/users', UserController.postNewUser);		// create new user
	app.put(		'/api/users/:id', UserController.editUser); 			// edit user 
	app.delete(	'/api/users/:id', UserController.deleteUser); 	// delete user
};