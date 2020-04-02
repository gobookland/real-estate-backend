import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const LocationSchema = new Schema({
	image: {
		type: String,
		default: 'no-Img.png',
	},
	name: String,
});

export default model('location', LocationSchema);
