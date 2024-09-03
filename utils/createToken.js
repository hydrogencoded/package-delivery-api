import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const createToken = (payload, expiryTime = '1h') => {
	const secret = process.env.SECRET;
	const token = jwt.sign(payload, secret, { expiresIn: expiryTime });

	return token;
};

export default createToken;
