import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	destination: {
		type: String,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	packageNumber: {
		type: String,
		required: true,
		unique: true,
	},
	status: {
		type: String,
		enum: ['pending', 'shipped', 'delivered'],
		default: 'pending',
	},
});

const itemModel = mongoose.model('Item', itemSchema);

export default itemModel;
