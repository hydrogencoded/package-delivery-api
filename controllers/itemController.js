import itemModel from '../models/itemModel.js';
import generatePackageNumber from '../utils/generatePackageNumber.js';

const addItem = async (req, res) => {
	const { description, destination, weight } = req.body;
	const userId = req.session.userId;

	if (!userId) {
		throw new Error('Unauthorized: Please log in to add items.');
	}

	try {
		const packageNumber = generatePackageNumber();

		const item = new itemModel({
			user: userId,
			description,
			destination,
			weight,
			packageNumber,
		});

		await item.save();

		res.status(200).json(item);
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

const trackItem = async (req, res) => {
	const { packageNumber } = req.params;

	try {
		const item = await itemModel.findOne({ packageNumber });

		if (!item) {
			throw new Error('Package Not found');
		} else {
			res.json(item);
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

const deleteItem = async (req, res) => {
	const { packageNumber } = req.params;

	try {
		const item = await itemModel.findOneAndDelete({ packageNumber });

		if (!item) {
			throw new Error('Package Not found');
		} else {
			res.json(item);
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

export { addItem, trackItem, deleteItem };
