import Router from 'koa-router';
import * as productCtrl from './product.ctrl';
import { productInfoMiddleware } from '../../lib/jwtMiddleware';

const product = new Router();

// * 상품 목록
product.get('/', productCtrl.list);
product.get('/order/:orderField/:orderType', productCtrl.listByOrder);
product.get(
	'/order/:orderField/:orderType/:productType',
	productCtrl.listByOrderWithProductType,
);

// * 상품 등록 과정
product.post(
	'/buildingInfo',
	productInfoMiddleware,
	productCtrl.saveBuildingInfo,
);
product.post(
	'/transactionInfo',
	productInfoMiddleware,
	productCtrl.saveTransactionInfo,
);
product.post('/imageInfo', productInfoMiddleware, productCtrl.saveImageInfo);
product.post('/create', productInfoMiddleware, productCtrl.createProduct);

// * 업종, 상세업종
product.get('/sectors/:sectorType', productCtrl.listSectors);
product.post('/sectors/:sectorType', productCtrl.addSectors);

// * 위치 정보
product.get('/location', productCtrl.listLocation);
product.post('/location', productCtrl.addLocation);

export default product;
