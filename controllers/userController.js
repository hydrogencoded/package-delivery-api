import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createToken from '../utils/createToken.js';
import dotenv from 'dotenv';
import SignupTemplate from '../emails/signup.js';
import sendMail from '../utils/sendMail.js';
dotenv.config();

//USER REGISTRATION
const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		if (!name) {
			throw new Error('name must be included');
		}
		if (!email) {
			throw new Error('Email must be included');
		}
		if (!password) {
			throw new Error('Password must be included');
		}

		// Check if user exists
		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			throw new Error(' There is an account with this email, Log in instead');
		}

		// Password length
		if (password.length < 8) {
			throw new Error('Password must be greater than 8');
		}
		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await userModel.create({
			name,
			email,
			password: hashedPassword,
		});

		// send email that you've signed up succesfully
		const html = SignupTemplate({
			name: user.name,
		});

		await sendMail({
			email: user.email,
			subject: 'Welcome to Delivr,  We hope you have a wonderful experience',
			html,
		});

		user.password = null;

		//CREATE A SESSION FOR THE USER
		req.session.userId = user.id;

		res.status(200).json(user);
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

//USER LOGIN
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			throw new Error(' All credentials are needed');
		}
		const user = await userModel.findOne({ email });

		if (!user) {
			throw new Error(
				'There is no user associated with this account sign up instead'
			);
		}
		const matchedPassword = await bcrypt.compare(password, user.password);
		if (!matchedPassword) {
			throw new Error('Incorrect Password');
		}
		user.password = null;

		//CREATE A SESSION FOR THE USER
		req.session.userId = user.id;

		res.status(200).json({ user });
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

//USER LOGOUT
const logoutUser = async (req, res) => {
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

//AUTO LOGIN
const autoLoginUser = async (req, res) => {
	const id = req.session.userId;

	try {
		if (!id) {
			throw new Error('User not logged in');
		}
		const user = await userModel.findById(id);
		res.status(200).json(user);
	} catch (error) {
		console.log(error.message);
		res.status(400).json(error.message);
	}
};

export { registerUser, loginUser, logoutUser, autoLoginUser };
