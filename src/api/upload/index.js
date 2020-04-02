import Router from 'koa-router';
import * as uploadCtrl from './upload.ctrl';
import multer from '@koa/multer';

const upload = new Router();
const mlt = multer({ dest: 'uploads/' });

upload.post('/storeImage', mlt.single('storeImage'), uploadCtrl.uploadImage);
upload.post(
	'/locationImage',
	mlt.single('locationImage'),
	uploadCtrl.uploadImage,
);

export default upload;
