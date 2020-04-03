import Joi from 'joi';
import User from '../../models/user';

// * POST /api/auth/register
/*
 * {
 *  username:"username",
 *  password:"password"
 * }
 * only one person can register
 */
export const register = async ctx => {
	if (!(await User.registerAvailable())) {
		// Forbidden
		ctx.status = 403;
		return;
	}

	const schema = Joi.object().keys({
		username: Joi.string().required(),
		password: Joi.string().required(),
	});

	const result = Joi.validate(ctx.request.body, schema);
	if (result.error) {
		// Bad Request
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { username, password } = ctx.request.body;
	try {
		const exist = await User.findOneByUsername(username);
		if (exist) {
			// Conflict
			ctx.status = 409;
			return;
		}

		const user = new User({
			username,
			password,
		});

		await user.hashPassword();
		await user.save();

		const token = user.generateToken();
		ctx.cookies.set('access_token', token, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		});

		ctx.body = user.serialize();
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * POST /api/auth/login
/*
 * {
 *  username:"username",
 *  password:"password"
 * }
 */
export const login = async ctx => {
	const schema = Joi.object().keys({
		username: Joi.string().required(),
		password: Joi.string().required(),
	});

	const result = Joi.validate(ctx.request.body, schema);
	if (result.error) {
		// Bad Request
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { username, password } = ctx.request.body;
	try {
		const user = await User.findOneByUsername(username);
		if (!user) {
			// Not Found
			ctx.status = 404;
			return;
		}

		const valid = await user.checkPassword(password);
		if (!valid) {
			// Unauthorized
			ctx.status = 401;
			return;
		}

		const token = user.generateToken();
		ctx.cookies.set('access_token', token, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		});

		ctx.body = user.serialize();
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * GET /api/auth/check
export const check = ctx => {
	const { user } = ctx.state;
	if (!user) {
		// Unauthorized
		ctx.status = 401;
		return;
	}

	ctx.body = user;
};

// * POST /api/auth/logout
export const logout = ctx => {
	ctx.cookies.set('access_token');

	// No-Content
	ctx.status = 204;
};
