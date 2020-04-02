import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
	username: String,
	password: String,
});

UserSchema.statics.findByUsername = function(username) {
	return this.findOne({ username });
};

UserSchema.methods.generateToken = function() {
	const token = jwt.sign(
		{
			_id: this._id,
			username: this.username,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '7d',
		},
	);

	return token;
};

UserSchema.methods.passwordCheck = async function(password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function(next) {
	const hashedPassword = await bcrypt.hash(this.password, 10);
	this.password = hashedPassword;
	next();
});

export default model('user', UserSchema);
