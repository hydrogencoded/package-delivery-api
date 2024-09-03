import express from 'express';
import {
	autoLoginUser,
	loginUser,
	logoutUser,
	registerUser,
} from '../controllers/userController.js';
const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/autologin', autoLoginUser);
userRoutes.post('/logout', logoutUser);

export default userRoutes;
