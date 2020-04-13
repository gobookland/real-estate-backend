import { gql } from 'apollo-server';
import buildingTypeDefs from './building';
import sectorTypeDefs from './sector';
import userTypeDefs from './user';

const typeDefs = gql`
	${sectorTypeDefs}
	${buildingTypeDefs}
	${userTypeDefs}

	type Query {
		# Query about building
		buildings(
			creationDate: Int
			dealType: String
			field: String
			fieldOrder: Int
		): [Building]
		building(id: ID!): Building

		# Query about sector
		sectors(type: String): [Sector] # do not need a query to get one sector
		# Query about authentication
		login(userInput: userInput!): Check
		# check if user logged in
		check: Check
	}

	type Mutation {
		# Mutation about building
		addBuilding(buildingInput: buildingInput): Building
		modifyBuilding(id: ID!, buildingInput: buildingInput): Building
		deleteBuilding(id: ID!): Building

		# Mutation about sector
		addSector(sectorInput: sectorInput): Sector
		deleteSector(sectorInput: sectorInput): Sector
		# Because sector is just a data containing one word, there's no meaning at modifing sector data

		# Mutation about authentication
		register(userInput: userInput): Check
	}
`;

export default typeDefs;
