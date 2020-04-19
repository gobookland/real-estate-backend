import Location from '../../models/Location';
import { ApolloError } from 'apollo-server';

// List all locations
export const locations = async () => {
	try {
		const locations = await Location.find({});

		return locations;
	} catch (e) {
		console.log(e);
	}
};

// Add Location
export const addLocation = async (_, { locationInput }) => {
	try {
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
	} catch (e) {
		console.log(e);
	}
};

// Delete a Location with locationName
export const deleteLocation = async (_, { names }) => {
	try {
		let deleted = [];
		names.forEach(async (name) => {
			const location = await Location.findOneAndDelete({ name });
			deleted.push(location);
		});
		return deleted;
	} catch (e) {
		console.log(e);
	}
};
