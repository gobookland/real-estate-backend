import mongoose from 'mongoose';
import { SectorSchema } from './Sector';
import { LocationSchema } from './Location';

const { Schema, model } = mongoose;

const BuildingSchema = new Schema({
	creationDate: {
		type: Date,
		default: new Date(),
	},
	buildingInfo: {
		image: String,
		name: String,

		layer: Number,
		number: Number,

		saleArea: Number,
		realArea: Number,

		sectors: {
			basic: String,
			detail: String,
		},

		location: LocationSchema,
	},
	dealInfo: {
		trade: {
			price: Number,
			deposit: Number,
			monthly: Number,
			totalPrice: Number,
		},
		lease: {
			price: Number,
			deposit: Number,
			monthly: Number,
		},
		rights: Number,
	},
	partyInfo: {
		owner: String,
		ownerPhone: String,
		lessee: String,
		lesseePhone: String,
	},
});

BuildingSchema.pre('save', function(next) {
	const { trade } = this.dealInfo;
	if (trade) {
		trade.totalPrice = trade.price * this.buildingInfo.saleArea;
	}
	next();
});

export default model('building', BuildingSchema);
