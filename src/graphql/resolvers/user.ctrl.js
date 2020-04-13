import { ApolloError } from 'apollo-server';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

// Login Query
export const login = async (_, { userInput }, { ctx }) => {
	try {
		const { username, password } = userInput;

		// Check weather username exist
		const user = await User.findByUsername(username);
		if (!user) {
			return new ApolloError('User not found', 'user_not_found');
		}

		// Check password
		const passwordCheck = await user.passwordCheck(password);
		if (!passwordCheck) {
			return new ApolloError('Password Incorrect', 'invalid_password');
		}

		const token = user.generateToken();
		ctx.cookies.set('access_token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
			secure: true,
			sameSite: false,
		});

		return {
			id: user._id,
			username: user.username,
		};
	} catch (e) {
		console.log(e);
	}
};

export const check = async (_, __, { token }) => {
	try {
		if (token) {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const now = Math.floor(Date.now() / 1000);

			if (decoded.exp - now < 60 * 60 * 24 * 3) {
				const user = await User.findById(decoded.id);
				const token = user.generateToken();

				ctx.cookies.set('access_token', token, {
					httpOnly: true,
					maxAge: 1000 * 60 * 60 * 24 * 7,
					secure: true,
					sameSite: false,
				});
			}

			return {
				id: decoded._id,
				username: decoded.username,
			};
		} else {
			return new ApolloError('Unauthorized', 'unauthorized');
		}
	} catch (e) {
		console.log(e);
	}
};

// Register Mutation
export const register = async (_, { userInput }, { ctx }) => {
	try {
		const { username, password, passwordCheck } = userInput;

		if (password !== passwordCheck) {
			return new ApolloError(
				'Password and Password Check are not same',
				'check_password_passwordCheck',
			);
		}

		// Count Check
		const cnt = await User.find({});

		if (cnt.length >= 2) {
			return new ApolloError('Not Available', 'max_user');
		}

		// Conflict Check
		const exist = await User.findByUsername(username);
		if (exist) {
			return new ApolloError('Username already exist', 'conflict_username');
		}

		// Create new User
		const newUser = new User({
			username,
			password,
		});

		await newUser.save();

		// Get Token
		const token = newUser.generateToken();
		ctx.cookies.set('access_token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
			secure: true,
			sameSite: false,
		});

		return { id: newUser._id, username: newUser.username };
	} catch (e) {
		console.log(e);
	}
};
