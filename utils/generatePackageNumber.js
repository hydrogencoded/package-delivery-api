import crypto from 'crypto';

const generatePackageNumber = () => {
	return crypto.randomBytes(8).toString('hex');
};

export default generatePackageNumber;
