import fs from 'fs';

// make filename to random number
function hashFilename(filename) {
	let hash = 0;
	Array.from(filename).map((key, index) => {
		hash +=
			Math.pow(key.charCodeAt(0), index) *
			Math.pow(41, filename.length - 1 - index);
	});

	return hash % 10000;
}

// Mutation for single file upload
export const singleFileUpload = async (_, { file }) => {
	const { createReadStream, filename, mimetype, encoding } = await file;

	console.log(file);
	const fileStream = createReadStream();

	// const date = new Date();

	// let newFilename = `${date.getFullYear()}${
	// 	date.getMonth() + 1
	// }${date.getDate()}${date.getTime()}${hashFilename(filename)}`;

	fileStream.pipe(fs.createWriteStream(`./uploads/${filename}`));

	return { filename, mimetype, encoding };
};
