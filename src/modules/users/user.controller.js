const Users = require('./user.model');

class UserController {
	static async getAllUsers (req, res) {
		try {
			let options = {
				limit: Number(req.query.limit),
				page: Number(req.query.page)
			}
			const allUsers = await Users.find({});
			let result = {};
			result.docs = await Users.find({}).limit(options.limit).skip(options.limit * (options.page - 1)).sort({ name: 'asc'});
			result.total = allUsers.length;
			res.json(result);
		} catch (err) {
			console.log(err);
			res.json(err);
		}
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

	static async postNewUser (req, res) {
		try {
			const user = await Users({
				name: req.body.name,
				age: req.body.age
			});
			await user.save();
			res.json(user);
		} catch (err) {
			console.log(err);
			res.send(err);
		}
	}

	static async deleteUser (req, res) {
		try {
			console.log(`user to delete: ${req.params.id}`);
			await Users.findByIdAndRemove({ _id: req.params.id});
			res.send('User Deleted Successfully.');
		} catch (err) {
			res.send(err);
		}
	}
}

module.exports = UserController;
