const Schema = global.Mongoose.Schema;

const userSchema = new Schema({
	name: String,
	pwd: String,
	age: Number
});

userSchema.methods.joiValidate = function(obj) {
	const Joi = require('joi');
	const schema = {
		name: Joi.string().min(4).max(20).required(),
		pwd: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3, 30}/),
		age: Joi.number().integer().min(18).max(99).required()
	}

	return Joi.validate(obj, schema);
}

const Users = global.Mongoose.model('users', userSchema);

module.exports = Users;