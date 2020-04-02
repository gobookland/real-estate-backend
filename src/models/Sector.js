import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const SectorSchema = new Schema({
	type: {
		type: String,
		enum: ['basic', 'detail'],
		default: 'basic',
	},
	name: String,
});

export default model('sector', SectorSchema);
