const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  profile_picture: { type: String, default: '' },
}, { timestamps: true });

export default model('users', userSchema);