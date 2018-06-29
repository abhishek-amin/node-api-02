const Schema = global.Mongoose.Schema;

const userSchema = new Schema({
	name: String,
	pwd: String,
	age: Number
});

const Users = global.Mongoose.model('users', userSchema);

module.exports = Users;