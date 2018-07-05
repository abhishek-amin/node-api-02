const UsersController = require('./users.controller');

module.exports = (app) => {
	app.post(		'/api/signup', UsersController.signup); // Signup
	app.post(		'/api/login', UsersController.login); // Login
	app.get(		'/api/logout', UsersController.logout); // Logout
	app.get(		'/api/users', UsersController.getUsers); // Get all users
	app.put(		'/api/users/:id', UsersController.editUser); // edit user
	app.delete(	'/api/users/:username', UsersController.deleteUser); // delete user
};