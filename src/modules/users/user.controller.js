const Users = require('./user.model');

class UserController {
	static async getHomePage (req, res) {
		console.log('inside api function ');
		res.send('Users Home Page.');
	}

	static async getUserByAge(req, res) {
		try {
			const user = await Users.find({ age: req.params.age});
			res.send(user);
		} catch (err) {
			res.send(err);
		}
	}

	static async getUserByName(req, res) {
		try {
			const user = await Users.find({ name: req.params.name});
			res.send(user);
		} catch (err) {
			res.send(err);
		}
	}
}

module.exports = UserController;