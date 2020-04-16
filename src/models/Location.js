import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const LocationSchema = new Schema({
	image: {
		type: String,
		default: 'No-Image.jpg',
	},
	name: String,
});

export default model('location', LocationSchema);
