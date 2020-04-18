import { gql } from 'apollo-server';

const typeDefs = gql`
	type Traffic {
		updateDate: String
		percentage: Int
	}
`;

export default typeDefs;
