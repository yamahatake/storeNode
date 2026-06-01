const {Schema, model} = require('mongoose');

const productSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	categories: { type: [String], required: true },
	images: { type: [String], default: '' },
	thumbnail: { type: String, default: '' },
	discount: { type: Number, default: 0 },
	cupom_code: { type: String, default: '' },
	rating: { type: Number, default: 0 },
	reviews: { type: [{ user: String, comment: String, rating: Number }], default: [] },
	seller: { type: Schema.Types.ObjectId, ref: 'users', required: true },
	freight: { type: Number, default: 0 },
	stock: { type: Number, default: 0 },
}, { timestamps: true });

export default model('products', productSchema);