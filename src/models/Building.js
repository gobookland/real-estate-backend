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
	officialsInfo: {
		owner: String,
		ownerPhone: String,
		lessee: String,
		lesseePhone: String,
	},
	history: [
		{
			updateDate: {
				type: Date,
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
		},
	],
	traffic: [
		{
			updateDate: {
				type: Date,
			},
			percentage: Number,
		},
	],
});

BuildingSchema.pre('save', async function () {
	const { trade, lease } = this.dealInfo;
	const { saleArea } = this.buildingInfo;
	if (trade) {
		trade.totalPrice = trade.price * saleArea;
	}
	if (lease) {
		lease.price = lease.monthly / saleArea;
	}
});

export default model('building', BuildingSchema);
