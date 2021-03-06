import Sector from '../../models/Sector';
import { ApolloError } from 'apollo-server';

// * Query
// List sectors depend on type(can be null)
export const sectors = async (_, { type, parent }) => {
	try {
		let sectors;
		if (type) sectors = await Sector.find({ type, parent });
		else sectors = await Sector.find({});
		return sectors;
	} catch (e) {
		console.log(e);
	}
};

// * Mutation
// Add sector with name, type
export const addSector = async (_, { type, parent, name }) => {
	try {
		const exist = await Sector.find({ type, parent, name });
		if (exist.length !== 0) {
			return new ApolloError('Duplicate Sector', 'duplicate_sector');
		}

		const sector = new Sector({
			type,
			parent,
			name,
		});

		await sector.save();

		return sector;
	} catch (e) {
		console.log(e);
	}
};

// Delete sector with name, type
export const deleteSector = async (_, { sectorInput }) => {
	try {
		let deletedSectors = [];
		await sectorInput.forEach(async (sector) => {
			const deletedSector = await Sector.findOneAndDelete({ ...sector });
			deletedSectors.push(deletedSector);
			if (!sector.parent) {
				const deleted = await Sector.deleteMany({
					parent: sector.name,
					type: 'detail',
				});

				deletedSectors.push(deleted);
			}
		});
		return deletedSectors;
	} catch (e) {
		console.log(e);
	}
};
