const Users = require('./users.model');
const Posts = require('../posts/posts.model')

class UsersController {
	// {
	// 	"name": "Abhishek Amin",
	// 	"username": "abhishek",
	// 	"pwd": "MyPassword123",
	// 	"age": 21
	// }
	static async signup (req, res) {
		try {
			const bcrypt = require('bcrypt');
			const hashed = await bcrypt.hash(req.body.pwd, 10);
			const newUser = {
				name: req.body.name,
				username: req.body.username,
				pwd: req.body.pwd,
				age: req.body.age
			}
			const user = await Users(newUser);
			await user.joiValidate(newUser);
			user.pwd = hashed;
			await user.save();
			res.status(201).json(user);
		} catch (err) {
			console.log(err)
			res.status(404).send(err);
		}
	}

	static async login (req, res) {
		try {
			const bcrypt = require('bcrypt');
			const user = await Users.findOne({username: req.body.username});
			if (user) {
				if (await bcrypt.compare(req.body.pwd, user.pwd)) {
					req.session.user = user
					res.status(200).json({message: `${user.name} Logged In.`});
				}
			} else res.status(404).json({error: `No such user`})
		} catch (err) {
			res.status(404).send(err);
		}
	}

	static async logout (req, res) {
		try {
			const user = req.session.user;
			if (user) {
				await req.session.destroy()
				res.status(200).json({msg: `User ${user.name} Logged out.`});
			}
		} catch (err) {
			res.status(404).send(err);
		}
	}

	static async getUsers (req, res) {
		let options = {
			limit: Number(req.query.limit),
			page: Number(req.query.page)
		}
		if (req.query.age && req.query.name) {
			try {
				const user = await Users
				.find({
					age: req.query.age,
					name: req.query.name
				})
				.limit(options.limit)
				.skip(options.limit * (options.page - 1))
				.sort({ name: 'asc'});
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
				const user = await Users
					.find({ name: req.query.name})
					.limit(options.limit).skip(options.limit * (options.page - 1))
					.sort({ name: 'asc'});
				res.status(200).send(user);
			} catch (err) {
				res.status(404).send(err);
			}
		} else {
			try {
				const allUsers = await Users.find({});
				let result = {};
				result.currentUser = {
					name: req.session.user.name,
					username: req.session.user.username
				};
				result.docs = await Users
					.find({})
					.limit(options.limit)
					.skip(options.limit * (options.page - 1))
					.sort({ name: 'asc'});
				result.total = allUsers.length;
				res.status(200).json(result);
			} catch (err) {
				res.status(404).send(err);
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
			res.status(200).json({msg: "User updated."});
		} catch (err) {
			res.status(404).json({msg: "Failed to update user."});
		}
	}

	static async deleteUser (req, res) {
		try {
			await Users.findOneAndRemove({ username: req.params.username});
			await Posts.deleteMany({username: req.params.username});
			res.status(200).json(`User ${req.params.username} deleted successfully.`);
		} catch (err) {
			console.log(err)
			res.status(404).send(err);
		}
	}
}

module.exports = UsersController;
