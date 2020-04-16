import Building from '../../models/Building';

// * Query
// List all buildings with filter :creationDate and dealType
export const buildings = async () => {
	try {
		const buildings = await Building.find({});

		return buildings;
	} catch (e) {
		console.log(e);
	}
};

// get information about a specific building with id or name
export const building = async (_, { id }) => {
	try {
		let building;
		if (id) building = await Building.findById(id);

		return building;
	} catch (e) {
		console.log(e);
	}
};

// * Mutation
// add building information
export const addBuilding = async (_, { buildingInput }) => {
	try {
		const building = new Building({
			...buildingInput,
		});

		await building.save();

		return building;
	} catch (e) {
		console.log(e);
	}
};

// modify building information with id
export const modifyBuilding = async (_, { id, buildingInput }) => {
	try {
		const building = await Building.findOneAndUpdate(
			{ _id: id },
			{
				...buildingInput,
			},
			{ new: true },
		);

		return building;
	} catch (e) {
		console.log(e);
	}
};

// delete building information with id
export const deleteBuilding = async (_, { ids }) => {
	try {
		let deleted = [];
		await ids.map(async (id) => {
			const deletedBuilding = await Building.findOneAndRemove({ _id: id });
			deleted.push(deleteBuilding);
		});

		return deleted;
	} catch (e) {
		console.log(e);
	}
};
