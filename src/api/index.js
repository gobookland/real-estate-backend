import Router from 'koa-router';
import auth from './auth';
import product from './products';
import upload from './upload';
import checkLoggedIn from '../lib/checkLoggedIn';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/products', checkLoggedIn, product.routes());
api.use('/upload', checkLoggedIn, upload.routes());

export default api;
