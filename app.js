import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import itemRoutes from './routes/itemRoute.js';
import adminRoutes from './routes/adminRoute.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();
const SECRET = process.env.SECRET;
const app = express();

//connect to mongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017/package-delivery-api';
const port = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up express session for authentication
app.use(
	session({
		secret: SECRET,
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 60 * 60 * 1000 * 24 * 3, //3 days
			httpOnly: true,
			secure: false,
			sameSite: null,
		},
		store: mongoStore.create({
			mongoUrl: MONGO_URI,
		}),
	})
);

//import routes
app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/admin', adminRoutes);

mongoose.connect(MONGO_URI).then(() => {
	console.log('Database connected successfully');
	app.listen(port, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log(`Server is listening on port ${port}`);
		}
	});
});
