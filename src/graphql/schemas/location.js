import { gql } from 'apollo-server';

const typeDefs = gql`
	type Location {
		image: String!
		name: String!
	}

	input locationInput {
		image: String!
		name: String!
	}
`;

export default typeDefs;
