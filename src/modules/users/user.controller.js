const Users = require('./user.model');

class UserController {
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

	static async editUser (req, res) {
		try {
			const user = await Users.findByIdAndUpdate({ _id: req.params.id }, {
				name: req.body.name,
				age: req.body.age
			});
			await user.save();
			res.status(200).json({msg: "user updated."});
		} catch (err) {
			res.status(404).send(err);
		}
	}

	static async postNewUser (req, res) {

		const errorLog = {};

		if (isNaN(req.body.age) || req.body.age < 0 || req.body.age > 150) {
			errorLog['AgeParamError'] = 'Either age was not a valid number, integer, or is not in range.'
		}

		if (!req.body.name || req.body.name.length < 2 || req.body.name.length > 50) {
			errorLog['NameParamError'] = `Name must be a string with length between 2 and 50`;
		}

		if (Object.keys(errorLog).length >= 1) {
			res.json(errorLog).end();
		} 
		else {
			try {
				const newUser = {
					name: req.body.name,
					age: req.body.age
				}
				const user = await Users(newUser);
				// const err = await user.joiValidate(newUser);
				// if (err) throw err;
				await user.save();
				res.status(201).json(user);
			} catch (err) {
				console.log(err);
				res.status(404).send(err);
			}
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

module.exports = UserController;
