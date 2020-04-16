require('dotenv').config();

import Koa from 'koa';
import serve from 'koa-static';
import KoaBody from 'koa-bodyparser';
import cors from 'cors';

import { ApolloServer } from 'apollo-server-koa';
import mongoose from 'mongoose';

import { resolvers, typeDefs } from './graphql';

const app = new Koa();
const PORT = process.env.PORT || 4000;

app.use(KoaBody());
app.proxy = true;

app.use(serve('.'));

// Database connection
const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
db.on('connected', () => console.log('Database connected'));
db.on('error', (err) => console.log(err));

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ ctx }) => {
		const token = ctx.cookies.get('access_token');
		return { ctx, token };
	},
});
server.applyMiddleware({
	app,
	cors: { credentials: true, origin: 'https://weasy.netlify.com' }, // TODO: change to https://weasy.netlify.com
});

app.listen(PORT, () => {
	console.log(`🚀  Server ready at localhost:${PORT}`);
});
