import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const LocationSchema = new Schema({
	name: String,
	image: String,
});

export const SectorsSchema = new Schema({
	type: {
		type: String,
		enum: ['상세', '기본'],
		default: '기본',
	},
	name: String,
	isNull: Boolean,
});

SectorsSchema.statics.findSectorByName = function(name) {
	if (!name) return false;
	return this.findOne({ type: '기본', name });
};

SectorsSchema.statics.findSectorDetailByName = function(name) {
	if (!name) return false;
	return this.findOne({ type: '상세', name });
};

export const Location = model('location', LocationSchema);
export const Sectors = model('sectors', SectorsSchema);
