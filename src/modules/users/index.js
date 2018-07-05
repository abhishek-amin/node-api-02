const UsersController = require('./users.controller');

module.exports = (app) => {
	// app.post('/api/signup');
	app.post(		'/api/login', UsersController.login);
	app.get(		'/api/logout', UsersController.logout);
	app.get(		'/api/users', UsersController.getUsers);
	app.post(		'/api/users', UsersController.postNewUser); // create new user
	app.put(		'/api/users/:id', UsersController.editUser); // edit user
	app.delete(	'/api/users/:id', UsersController.deleteUser); // delete user
};