const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	thumbnail: { type: String, default: '' },
	seller: { type: Schema.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true });

export default model('categories', categorySchema);