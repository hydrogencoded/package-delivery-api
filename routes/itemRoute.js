import express from 'express';
import {
	addItem,
	deleteItem,
	trackItem,
} from '../controllers/itemController.js';
import checkAuthenticatedUser from '../middleware/auth.js';

const itemRoutes = express.Router();

itemRoutes.post('/add-item', checkAuthenticatedUser, addItem);
itemRoutes.get('/track/:packageNumber', trackItem);
itemRoutes.delete('/delete/:packageNumber', checkAuthenticatedUser, deleteItem);

export default itemRoutes;
