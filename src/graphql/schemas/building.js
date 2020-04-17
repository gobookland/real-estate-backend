import { gql } from 'apollo-server';

const building = gql`
	interface IDealInfo {
		price: Int
		deposit: Int
		monthly: Int
	}

	type TradingInfo implements IDealInfo {
		price: Int
		deposit: Int
		monthly: Int
		totalPrice: Int
	}

	type LeaseInfo implements IDealInfo {
		price: Int
		deposit: Int
		monthly: Int
	}

	input dealInfoInput {
		price: Int
		deposit: Int
		monthly: Int
	}

	type BuildingSector {
		basic: String
		detail: String
	}

	type BuildingInfo {
		image: String!
		name: String!

		layer: Int!
		number: Int!

		saleArea: Int!
		realArea: Int!
		sectors: BuildingSector

		location: Location
	}

	input buildingInfoInput {
		image: String!
		name: String!

		layer: Int!
		number: Int!

		saleArea: Int!
		realArea: Int!
		sector: String
		sectorDetail: String

		location: locationInput
	}

	type DealInfo {
		trade: TradingInfo
		lease: LeaseInfo
		rights: Int
	}

	input dealsInfoInput {
		trade: dealInfoInput
		lease: dealInfoInput
		rights: Int
	}

	type OfficialsInfo {
		owner: String!
		ownerPhone: String!
		lessee: String!
		lesseePhone: String!
	}

	input officialsInfoInput {
		owner: String!
		ownerPhone: String!
		lessee: String!
		lesseePhone: String!
	}

	type History {
		dealInfo: DealInfo
		updateDate: String!
	}

	type Building {
		id: ID!
		creationDate: String!
		buildingInfo: BuildingInfo
		dealInfo: DealInfo
		officialsInfo: OfficialsInfo
		history: [History]
	}

	input buildingInput {
		buildingInfo: buildingInfoInput!
		dealInfo: dealsInfoInput!
		officialsInfo: officialsInfoInput!
	}
`;

export default building;
