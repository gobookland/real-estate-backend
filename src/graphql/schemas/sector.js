import { gql } from 'apollo-server';

const sector = gql`
	enum SECTORTYPE {
		detail
		basic
	}

	type Sector {
		type: SECTORTYPE
		name: String
	}

	input sectorInput {
		basic: String
		detail: String
	}
`;

export default sector;
