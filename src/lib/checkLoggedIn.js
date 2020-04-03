const checkLoggedIn = (ctx, next) => {
	if (!ctx.state.user) {
		// Forbidden
		ctx.status = 403;
		return;
	}

	return next();
};

export default checkLoggedIn;
