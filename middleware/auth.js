const checkAuthenticatedUser = (req, res, next) => {
	const id = req.session.userId;

	if (!id) {
		return res.status(400).json('User not authenticated');
	} else {
		next();
	}
};

export default checkAuthenticatedUser;
