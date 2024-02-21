import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const users = [
    {
        name: 'The Awakening',
        email: 'Kate Chopin@g.com',
        projects:[{title:'site upgrade'}]
    },
    {
        name: 'City of Glass',
        email: 'Paul Auster@g.com',
        projects:[{title:'site upgrade'}]
    },
];
const typeDefs = `#graphql
  
  type User{
    name: String
    email: String
    projects:[Project]
  }
  type Project{
    title:String
    active:Boolean!,
    members:[User]
  }
  type Query{
    users: [User]
  }
`;

const resolvers = {
    Query: {
        users: () => users,
    },
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);