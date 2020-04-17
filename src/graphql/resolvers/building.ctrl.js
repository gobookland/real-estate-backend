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

		// const lastHistory = exBuilding.history[exBuilding.history.length - 1]
		// const lastHistoryDateObj = new Date(parseInt(lastHistory.updateDate))
		// const lastHistoryDate = `${lastHistoryDateObj.getFullYear()}-${lastHistoryDateObj.getMonth() + 1}-${lastHistoryDateObj.getDate()}`

		// const currDateObj = new Date(Date.now())
		// const currDate = `${currDateObj.getFullYear()}-${currDateObj.getMonth() + 1}-${currDateObj.getDate()}`

		// let updateData;

		// if(lastHistoryDate === currDate){
		// 	let newHistory = [...exBuilding.history]
		// 	newHistory[newHistory.length - 1] = {
		// 		...newHistory[newHistory.length - 1],

		// 	}

		// 	updateData = {
		// 		...buildingInput,
		// 		buildingInfo: {
		// 			...buildingInput.buildingInfo,
		// 			sectors: {
		// 				basic: buildingInput.buildingInfo.sector,
		// 				detail: buildingInput.buildingInfo.sectorDetail,
		// 			},
		// 		},
		// 		history: [
		// 			...exBuilding.history,
		// 			{ dealInfo: buildingInput.dealInfo, updateDate: Date.now() },
		// 		],
		// 	}
		// }
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
