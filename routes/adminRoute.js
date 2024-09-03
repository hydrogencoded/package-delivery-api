import express from 'express';
import checkAuthenticatedUser from '../middleware/auth.js';
import {
	loginAdmin,
	getAllUsers,
	getAllItems,
	registerAdmin,
	logoutAdmin,
	updateItem,
	getOneItem,
} from '../controllers/adminController.js';
const adminRoutes = express.Router();

adminRoutes.post('/register', registerAdmin);
adminRoutes.post('/login', loginAdmin);
adminRoutes.post('/login', logoutAdmin);
adminRoutes.get('/get-users', checkAuthenticatedUser, getAllUsers);
adminRoutes.get('/get-items', checkAuthenticatedUser, getAllItems);
adminRoutes.get('/get-item/:packageNumber', checkAuthenticatedUser, getOneItem);
adminRoutes.put(
	'/update-item/:packageNumber',
	checkAuthenticatedUser,
	updateItem
);

export default adminRoutes;
