const Users = require('./users.model');

class UsersController {
	static async getUsers (req, res) {
		if (req.query.age && req.query.name) {
			try {
				const user = await Users.find({
					age: req.query.age,
					name: req.query.name
				});
				res.status(200).send(user);
			} catch (err) {
				res.status(404).send(err);
			}			
		}

		if (req.query.age) {
			try {
				console.log(req.query.age);
				const user = await Users.find({ age: req.query.age});
				res.status(200).send(user);
			} catch (err) {
				res.status(404).send(err);
			}
		} else if (req.query.name) {
			try {
				const user = await Users.find({ name: req.query.name});
				res.status(200).send(user);
			} catch (err) {
				res.status(404).send(err);
			}
		} else {
			try {
				let options = {
					limit: Number(req.query.limit),
					page: Number(req.query.page)
				}
				const allUsers = await Users.find({});
				let result = {};
				result.docs = await Users.find({}).limit(options.limit).skip(options.limit * (options.page - 1)).sort({ name: 'asc'});
				result.total = allUsers.length;
				res.status(200).json(result);
			} catch (err) {
				console.log(err);
				res.status(404).json(err);
			}
		}
	}

	static async postNewUser (req, res) {
		try {
			const bcrypt = require('bcrypt');
			const hashed = await bcrypt.hash(req.body.pwd, 10);
			const newUser = {
				name: req.body.name,
				pwd: req.body.pwd,
				age: req.body.age
			}
			const user = await Users(newUser);
			await user.joiValidate(newUser);
			user.pwd = hashed;
			await user.save();
			res.status(201).json(user);
		} catch (err) {
			console.log(err);
			res.status(404).send(err);
		}
	}

	static async editUser (req, res) {
		try {
			const user = await Users.findByIdAndUpdate({ _id: req.params.id }, {
				name: req.body.name,
				age: req.body.age
			});
			await user.save();
			res.status(200).json({msg: "user updated."});
		} catch (err) {
			res.status(404).json({msg: "Failed to update user."});
		}
	}

	static async deleteUser (req, res) {
		try {
			await Users.findByIdAndRemove({ _id: req.params.id});
			res.status(200).send(`User ${req.params.id} deleted successfully.`);
		} catch (err) {
			res.status(404).send(err);
		}
	}
}

module.exports = UsersController;