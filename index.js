const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const {buildSchema} = require("graphql");

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }
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

const resolvers={
    Query:{
        books:()=>books
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const startServer = async() => {
    const {url} = await startStandaloneServer(server,{
        listen:{
            port:4000
        }
    })
    console.log(`server ready at: ${url}`);
}

startServer();