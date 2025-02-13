const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
	const token = req.cookies.auth_token;

	if (!token) {
		return null;
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;	
		next();
	} catch (error) {
		return res.status(403).json({ message: 'Invalid or expired token' });
	}
};

module.exports = authMiddleware;
