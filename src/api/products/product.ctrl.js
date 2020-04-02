import Product from '../../models/product';
import Joi from 'joi';
import { Location, Sectors } from '../../models/product.subDoc';
import jwt from 'jsonwebtoken';

// * GET /api/products/
export const list = async ctx => {
	try {
		let products;
		products = await Product.sortByField();
		ctx.body = products;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * GET /api/products/order/:orderField/:orderType/
export const listByOrder = async ctx => {
	const { orderField, orderType } = ctx.params;

	try {
		let products;
		products = await Product.sortByField(orderField, orderType);

		ctx.body = products;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * GET /api/products/order/:orderField/:orderType/:productType
export const listByOrderWithProductType = async ctx => {
	const { orderField, orderType, productType } = ctx.params;

	try {
		let products;
		if (productType === 'trading') {
			products = await Product.tradingSortByField(orderField, orderType);
		} else {
			products = await Product.leaseSortByField(orderField, orderType);
		}

		ctx.body = products;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * POST /api/products/buildingInfo
export const saveBuildingInfo = async ctx => {
	const schema = Joi.object().keys({
		buildingName: Joi.string().required(),
		buildingColumn: Joi.number().required(),
		buildingRow: Joi.number().required(),
		preSaleArea: Joi.number().required(),
		exclusiveArea: Joi.number().required(),
		sectors: Joi.string(),
		sectorsDetail: Joi.string(),
	});

	const result = Joi.validate(ctx.request.body, schema);
	if (result.error) {
		// Bad Request
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	try {
		const token = jwt.sign(
			{
				buildingInfo: ctx.request.body,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '7d',
			},
		);

		ctx.cookies.set('productInfo', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		ctx.body = ctx.request.body;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * POST /api/products/transactionInfo
export const saveTransactionInfo = async ctx => {
	const schema = Joi.object().keys({
		_trading: Joi.object({
			pricePerArea: Joi.number().allow(null),
			deposit: Joi.number().allow(null),
			monthly: Joi.number().allow(null),
			totalPrice: Joi.number().allow(null),
		}).allow(null),
		_lease: Joi.object({
			pricePerArea: Joi.number().allow(null),
			deposit: Joi.number().allow(null),
			monthly: Joi.number().allow(null),
		}).allow(null),
		_rights: Joi.object({
			price: Joi.number().allow(null),
		}).allow(null),
	});

	const result = Joi.validate(ctx.request.body, schema);
	if (result.error) {
		// Bad Request
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { _trading, _lease, _rights } = ctx.request.body;

	try {
		const { productInfo } = ctx.state;

		const transactionInfo = {
			_trading,
			_lease,
			_rights,
		};

		const token = jwt.sign(
			{ ...productInfo, transactionInfo: { ...transactionInfo } },
			process.env.JWT_SECRET,
			{
				expiresIn: '7d',
			},
		);

		ctx.cookies.set('productInfo', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		ctx.body = transactionInfo;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * POST /api/products/imageInfo
export const saveImageInfo = async ctx => {
	const schema = Joi.object().keys({
		storeImg: Joi.string(),
		location: {
			name: Joi.string(),
			image: Joi.string(),
		},
	});

	const result = Joi.validate(ctx.request.body, schema);
	if (result.error) {
		// Bad Request
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}
	const { storeImg, location } = ctx.request.body;
	try {
		const { productInfo } = ctx.state;

		const imageInfo = { storeImg, location };

		const token = jwt.sign(
			{
				...productInfo,
				imageInfo: { ...imageInfo },
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '7d',
			},
		);

		ctx.cookies.set('productInfo', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		ctx.body = imageInfo;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * GET /api/products/sectors/:sectorType
export const listSectors = async ctx => {
	const { sectorType } = ctx.params;

	try {
		const sectors = await Sectors.find({ type: sectorType });
		if (!sectors) {
			// NOT FOUND
			ctx.status = 404;
			return;
		}

		ctx.body = sectors;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * GET /api/products/location
export const listLocation = async ctx => {
	try {
		const locations = await Location.find({});
		if (!locations) {
			// NOT FOUND
			ctx.status = 404;
			return;
		}

		ctx.body = locations;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * POST /api/products/sectors/:sectorType
export const addSectors = async ctx => {
	const schema = Joi.object({
		name: Joi.string(),
	});

	const result = Joi.validate(ctx.request.body, schema);
	if (result.error) {
		// Bad Request
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { sectorType } = ctx.params;
	const { name } = ctx.request.body;
	try {
		const exist = await Sectors.findOne({
			type: sectorType,
			name,
		});

		if (exist) {
			// Conflict
			ctx.status = 409;
			return;
		}

		const sectors = new Sectors({
			type: sectorType,
			name,
		});

		await sectors.save();

		ctx.body = sectors;
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * POST /api/products/location
export const addLocation = async ctx => {
	const schema = Joi.object().keys({
		name: Joi.string(),
		image: Joi.string(),
	});

	const result = Joi.validate(ctx.request.body, schema);
	if (result.error) {
		// Bad Request
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { name, image } = ctx.request.body;
	try {
		const exist = await Location.findOne({ name });

		if (exist) {
			// Conflict
			ctx.status = 409;
			return;
		}

		const location = new Location({
			name,
			image,
		});

		await location.save();

		ctx.body = {
			name: location.name,
			image: location.image,
		};
	} catch (e) {
		ctx.throw(500, e);
	}
};

// * POST /api/products/create
export const createProduct = async ctx => {
	const schema = Joi.object().keys({
		ownerName: Joi.string(),
		ownerPhone: Joi.string(),
		lessee: Joi.string(),
		lesseePhone: Joi.string(),
	});

	const result = Joi.validate(ctx.request.body, schema);
	if (result.error) {
		// Bad Request
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}

	const { ownerName, ownerPhone, lessee, lesseePhone } = ctx.request.body;
	try {
		const { productInfo } = ctx.state;

		const buildingInfo = productInfo.buildingInfo;
		const transactionInfo = productInfo.transactionInfo;
		const imageInfo = productInfo.imageInfo;
		const officailsInfo = {
			ownerName,
			ownerPhone,
			lessee,
			lesseePhone,
		};

		const productType =
			transactionInfo._trading.pricePerArea &&
			transactionInfo._lease.pricePerArea
				? '모두'
				: transactionInfo._trading.pricePerArea
				? '매매'
				: '임대';

		const product = new Product({
			image: imageInfo.storeImg,
			location: imageInfo.location,
			trading: { ...transactionInfo._trading },
			lease: { ...transactionInfo._lease },
			rights: { ...transactionInfo._rights },
			productType,
			...buildingInfo,
			...officailsInfo,
			sectors: { type: '기본', name: buildingInfo.sectors },
			sectorsDetail: { type: '상세', name: buildingInfo.sectorsDetail },
		});

		await product.save();

		ctx.body = product;
	} catch (e) {
		ctx.throw(500, e);
	}
};
