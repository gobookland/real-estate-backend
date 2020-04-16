import { gql } from 'apollo-server';
import buildingTypeDefs from './building';
import sectorTypeDefs from './sector';
import userTypeDefs from './user';
import fileTypeDefs from './file';
import locationTypeDefs from './location';

const typeDefs = gql`
	${sectorTypeDefs}
	${buildingTypeDefs}
	${userTypeDefs}
	${fileTypeDefs}
	${locationTypeDefs}

	type Query {
		# Query about building
		buildings: [Building]
		building(id: ID!): Building

		# Query about sector
		sectors(type: String, parent: String): [Sector]

		# Query about authentication
		login(userInput: userInput!): Check

		# check if user logged in
		check: Check

		# List Location Informations
		locations: [Location]
	}

	type Mutation {
		# Mutation about building
		addBuilding(buildingInput: buildingInput): Building
		modifyBuilding(id: ID!, buildingInput: buildingInput): Building
		deleteBuilding(ids: [ID!]): [Building]

		# Mutation about sector
		addSector(type: String, parent: String, name: String): Sector
		deleteSector(type: String, parent: String, name: String): Sector
		# Because sector is just a data containing one word, there's no meaning at modifing sector data

		# Mutation about authentication
		register(userInput: userInput): Check

		# File upload
		singleFileUpload(file: Upload!): File

		# Add Location Information
		addLocation(locationInput: locationInput): Location
	}
`;

export default typeDefs;
