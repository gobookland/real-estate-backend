require('dotenv').config();

import Koa from 'koa';
import KoaBody from 'koa-bodyparser';

import { ApolloServer } from 'apollo-server-koa';
import mongoose from 'mongoose';

import { resolvers, typeDefs } from './graphql';

const app = new Koa();
const PORT = process.env.PORT || 4000;

app.use(KoaBody());

// Database connection
const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
db.on('connected', () => console.log('Database connected'));
db.on('error', err => console.log(err));

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ ctx }) => {
		const token = ctx.cookies.get('access_token');
		// console.log(token);

		// TODO: send a token as a part of context to check if requset was authenticated.
		return { ctx };
	},
});
server.applyMiddleware({ app });

app.listen(PORT, () => {
	console.log(`🚀  Server ready at localhost:${PORT}`);
});
