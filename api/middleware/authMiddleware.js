import jwt from 'jsonwebtoken'

// Verify user access token
export const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(" ")[0]; /* Get the token from the headers */
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) res.status(403).json("Invalid token");
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json("You're not authenticated");
	}
};

// Authorize users based on access token
export const tokenAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		req.user.id === id /*What is this id ??*/ || req.user.isAdmin
			? next()
			: res.status(403).json("unauthorized action");
	});
};

// Authorize admin actions
export const adminAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		req.user.isAdmin ? next() : res.status(403).json("unauthorized action");
	});
};