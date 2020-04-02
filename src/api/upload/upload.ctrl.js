// * POST /api/upload/storeImage | POST /api/upload/locationImage
export const uploadImage = async ctx => {
	ctx.body = ctx.file.filename;
};
