import adminModel from '../models/adminModel.js';
import userModel from '../models/userModel.js';
import itemModel from '../models/itemModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createToken from '../utils/createToken.js';
import dotenv from 'dotenv';

//use
dotenv.config();

const registerAdmin = async (req, res) => {
	const { username, password } = req.body;

	try {
		if (!username) {
			throw new Error('username must be included');
		}

		if (!password) {
			throw new Error('Password must be included');
		}

		// Check if admin exists
		const existingAdmin = await adminModel.findOne({ username });
		if (existingAdmin) {
			throw new Error(' There is an account with this email, Log in instead');
		}

		// Password length
		if (password.length < 8) {
			throw new Error('Password must be greater than 8');
		}
		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		const admin = await adminModel.create({
			username,
			password: hashedPassword,
		});

		admin.password = null;

		//CREATE A SESSION FOR THE admin
		req.session.adminId = admin.id;

		res.status(200).json(admin);
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

//admin LOGIN
const loginAdmin = async (req, res) => {
	const { username, password } = req.body;
	try {
		if (!username || !password) {
			throw new Error(' All credentials are needed');
		}
		const admin = await adminModel.findOne({ username });

		if (!admin) {
			throw new Error(
				'There is no admin associated with this account sign up instead'
			);
		}
		const matchedPassword = await bcrypt.compare(password, admin.password);
		if (!matchedPassword) {
			throw new Error('Incorrect Password');
		}
		admin.password = null;

		//CREATE A SESSION FOR THE admin
		req.session.adminId = admin.id;

		res.status(200).json({ admin });
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

//admin LOGOUT
const logoutAdmin = async (req, res) => {
	try {
		req.session.destroy((error) => {
			if (error) {
				res.status(400).json(error.message);
			} else {
				res.status(200).json('Logged out successfully');
			}
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find();
		res.status(200).json(users);
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

const getOneItem = async (req, res) => {
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

const getAllItems = async (req, res) => {
	try {
		// Find all items and populate the 'user' field with 'name' and 'email'
		const items = await itemModel.find().populate('user', 'name email');

		res.status(200).json(items);
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

const updateItem = async (req, res) => {
	const { packageNumber } = req.body;
	const { status } = req.body;
	try {
		// Validate the new status
		const validStatuses = ['pending', 'shipped', 'delivered'];
		if (!validStatuses.includes(status)) {
			throw new Error('Invalid Statuses');
		}

		// Find the item by ID and update its status
		const updatedItem = await itemModel.findOneAndUpdate(
			packageNumber,
			{ status },
			{ new: true }
		);

		// If item not found, return an error
		if (!updatedItem) {
			throw new Error('Item not found');
		}
		res.status(200).json(updatedItem);
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};
export {
	registerAdmin,
	loginAdmin,
	logoutAdmin,
	getAllUsers,
	getOneItem,
	getAllItems,
	updateItem,
};
