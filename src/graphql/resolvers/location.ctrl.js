import Location from '../../models/Location';
import { ApolloError } from 'apollo-server';

// List all locations
export const locations = async () => {
	const locations = await Location.find({});

	return locations;
};

// Add Location
export const addLocation = async (_, { locationInput }) => {
	const { name, image } = locationInput;

	const exist = await Location.find({ name });
	if (exist.length !== 0) {
		return new ApolloError('Duplicate Location', 'duplicate');
	}

	const location = new Location({
		name,
		image,
	});

	await location.save();
	return location;
};
