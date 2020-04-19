import * as buildingCtrl from './building.ctrl';
import * as sectorCtrl from './sector.ctrl';
import * as userCtrl from './user.ctrl';
import * as fileCtrl from './file.ctrl';
import * as locationCtrl from './location.ctrl';
import * as trafficCtrl from './traffic.ctrl';

// Graphql Resolver
const resolvers = {
	Query: {
		// Query about building
		buildings: buildingCtrl.buildings,
		building: buildingCtrl.building,

		// Query about sector
		sectors: sectorCtrl.sectors,

		// Query about user
		login: userCtrl.login,
		check: userCtrl.check,

		// Query about location
		locations: locationCtrl.locations,

		// Query about traffics
		traffics: trafficCtrl.traffics,
	},
	Mutation: {
		// Mutation about building
		addBuilding: buildingCtrl.addBuilding,
		modifyBuilding: buildingCtrl.modifyBuilding,
		deleteBuilding: buildingCtrl.deleteBuilding,

		// Mutation about sector
		addSector: sectorCtrl.addSector,
		deleteSector: sectorCtrl.deleteSector,

		// Mutation about user
		register: userCtrl.register,

		// Single File Upload
		singleFileUpload: fileCtrl.singleFileUpload,

		// Add Location
		addLocation: locationCtrl.addLocation,
		deleteLocation: locationCtrl.deleteLocation,

		// Add Traffic
		addTraffic: trafficCtrl.addTraffic,
	},
};

export default resolvers;
