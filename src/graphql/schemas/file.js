import { gql } from 'apollo-server';

const typeDef = gql`
	type File {
		filename: String!
		mimetype: String!
		encoding: String!
	}
`;

export default typeDef;
