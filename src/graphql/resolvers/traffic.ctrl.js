import Building from '../../models/Building';

// List all Traffics
export const traffics = async (_, { buildingId }) => {
	const building = await Building.findById(buildingId);

	return building.traffic;
};

// Add Traffic
export const addTraffic = async (_, { buildingId, percentage }) => {
	const building = await Building.findById(buildingId);

	const date = new Date(Date.now());
	const updateDate = `${date.getFullYear()}-${
		date.getMonth() + 1
	}-${date.getDate()}`;

	const newTraffic = {
		updateDate: new Date(updateDate),
		percentage,
	};

	building.traffic.push(newTraffic);
	await building.save();

	return newTraffic;
};
