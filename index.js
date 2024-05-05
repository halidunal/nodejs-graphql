const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')

const typeDefs = `#graphql
  type Book {
    id:Int!
    title: String!
    author: String!
    isActive: Boolean!
    price: Float!
    user: User!
  }
  type User {
    id:Int!
    name:String!
  }
  input CreateUserDataType{
    name: String!
  }
  type Mutation{
    createUser(data:CreateUserDataType):User!
  }
  type Query {
    books: [Book]
    users: [User]
    user(id:Int): Boolean!
  }
`;

const books = [
    {
        id: 1,
        title: 'The Awakening',
        author: 'Kate Chopin',
        isActive: true,
        price: 2.5,
        user: {
            id: 1,
            name: 'Kate',
        }
    },
    {
        id: 2,
        title: 'City of Glass',
        author: 'Paul Auster',
        isActive: false,
        price: 5.2,
        user: {
            id: 2,
            name: 'Paul',
        }
    },
];

const users = [
    {
        id: 1,
        name: 'Kate',
    },
    {
        id: 2,
        name: 'Paul',
    },
];

const resolvers={
    Mutation:{
        createUser(_,args){
            users.push({
                id: Date.now(),
                name: args.data.name
            })
            return true
        }
    },
    Query:{
        user:(_,args) => {
            return users.find(user => user.id === args.id)
        },
        books:()=>books,
        users:()=>users
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