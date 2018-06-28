const Schema = global.Mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const userSchema = new Schema({
	name: String,
	age: Number
});

userSchema.plugin(mongoosePaginate);

const Users = global.Mongoose.model('users', userSchema);

module.exports = Users;