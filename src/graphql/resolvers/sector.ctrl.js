import Sector from '../../models/Sector';

// * Query
// List sectors depend on type(can be null)
export const sectors = async (_, { type }) => {
	try {
		let sectors;
		if (type) sectors = await Sector.find({ type });
		else sectors = await Sector.find({});
		return sectors;
	} catch (e) {
		console.log(e);
	}
};

// * Mutation
// Add sector with name, type
export const addSector = async (_, { sectorInput }) => {
	try {
		const { basic, detail } = sectorInput;
		let sector;

		if (basic) {
			sector = new Sector({
				type: 'basic',
				name: basic,
			});

			await sector.save();
		}
		if (detail) {
			sector = new Sector({
				type: 'detail',
				name: detail,
			});

			await sector.save();
		}

		return sector;
	} catch (e) {
		console.log(e);
	}
};

// Delete sector with name, type
export const deleteSector = async (_, { sectorInput }) => {
	try {
		const deletedSector = await Sector.findOneAndDelete({ ...sectorInput });
		return deletedSector;
	} catch (e) {
		console.log(e);
	}
};
