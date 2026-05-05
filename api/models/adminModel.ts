const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  profile_picture: { type: String, default: '' },
}, { timestamps: true });

export default model('admins', adminSchema);