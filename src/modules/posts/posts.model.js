const Schema = global.Mongoose.Schema

const postSchema = new Schema({
  username: {type: String, ref: 'users'},
  content: String,
  timeStamp: String,
}, {
  versionKey: false
});

postSchema.methods.joiValidate = function (obj) {
  const Joi = require('joi');
  const schema = {
    username: Joi.string().required(),
    content: Joi.string().min(1).max(160).required(),
    timeStamp: Joi.string().required()
  }
  return Joi.validate(obj, schema);
}

const Posts = global.Mongoose.model('posts', postSchema);

module.exports = Posts;