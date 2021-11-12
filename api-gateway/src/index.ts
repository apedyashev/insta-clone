import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/user';
import { GlobalErrorHandler } from './middlewares/global-error-handler'
import { ApolloServer, gql } from 'apollo-server'

const app = createExpressServer({
    controllers: [UserController], // we specify controllers we want to use
    middlewares: [GlobalErrorHandler],
    defaultErrorHandler: false
});

import dotenv from 'dotenv'
import log4js from 'log4js';

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL || 'debug';

const port = process.env.PORT || 3000;

logger.info('log4js log info1');
logger.debug('log4js log debug');
logger.error('log4js log error');


// app.listen(port, () => console.log(`Running on port ${port}`));

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});