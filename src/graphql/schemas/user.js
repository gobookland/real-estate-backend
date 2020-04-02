import { gql } from 'apollo-server';

const user = gql`
	type User {
		username: String!
		password: String!
	}

	input userInput {
		username: String!
		password: String!
		passwordCheck: String
	}

	type Check {
		id: ID!
		username: String!
	}
`;

export default user;
