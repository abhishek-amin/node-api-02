const dateFormat = require('dateformat');
const UserController = require('./user.controller');

module.exports = (app) => {
	app.use(function timeLog (req, res, next){
		console.log('HTTP REQUEST on: ', dateFormat());
		next()
	});
	
	// routes for user
	app.get('/api/user', UserController.getAllUsers);
	app.get('/api/user/byAge/:age', UserController.getUserByAge);
	app.get('/api/user/byName/:name', UserController.getUserByName);
	app.post('/api/user', UserController.postNewUser);
	app.delete('/api/user/:id', UserController.deleteUser);
};