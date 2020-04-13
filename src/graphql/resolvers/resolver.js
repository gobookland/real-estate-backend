import * as buildingCtrl from './building.ctrl';
import * as sectorCtrl from './sector.ctrl';
import * as userCtrl from './user.ctrl';

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
	},
};

export default resolvers;
