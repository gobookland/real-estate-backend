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
			buildingInfo: {
				...buildingInput.buildingInfo,
				sectors: {
					basic: buildingInput.buildingInfo.sector,
					detail: buildingInput.buildingInfo.sectorDetail,
				},
			},
			history: [{ dealInfo: buildingInput.dealInfo, updateDate: Date.now() }],
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
		const exBuilding = await Building.findById(id);

		const building = await Building.findOneAndUpdate(
			{ _id: id },
			{
				...buildingInput,
				buildingInfo: {
					...buildingInput.buildingInfo,
					sectors: {
						basic: buildingInput.buildingInfo.sector,
						detail: buildingInput.buildingInfo.sectorDetail,
					},
				},
				dealInfo: {
					...buildingInput.dealInfo,
					trade: {
						...buildingInput.dealInfo.trade,
						totalPrice:
							parseInt(buildingInput.buildingInfo.saleArea) *
							parseInt(buildingInput.dealInfo.trade.price),
					},
					lease: {
						...buildingInput.dealInfo.lease,
						price:
							parseInt(buildingInput.dealInfo.lease.monthly) /
							parseInt(buildingInput.buildingInfo.saleArea),
					},
				},
				history: [
					...exBuilding.history,
					{ dealInfo: buildingInput.dealInfo, updateDate: Date.now() },
				],
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
