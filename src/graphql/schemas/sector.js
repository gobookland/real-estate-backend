import { gql } from 'apollo-server';

const sector = gql`
	enum SECTORTYPE {
		detail
		basic
	}

	type Sector {
		type: SECTORTYPE
		name: String
		parent: String
	}
`;

export default sector;
