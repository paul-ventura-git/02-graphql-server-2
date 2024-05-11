import { ApolloServer, gql } from 'apollo-server'


// Schema
const typeDefinitions = gql`
    type MyResolver {
        address: Address!
    }

    type Address {
        street: String
        city: String
    }

    type Person {
        name: String!
        phone: String!
        street: String!
        city: String!
        id: ID!
        address: Address!
        check: String
    }
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons, // Se puede tomar de una API, db, etc.
        findPerson: (root, args) => {
            const { name } = args
            return persons.find(person => person.name === name)
        }
    },
    
    Person: {
        // Esto ocurre por defecto...
        name: (root) => root.name, // Root means "pre", el objeto que se resolvio en query
        phone: (root) => root.phone,
        street: (root) => root.street,
        city: (root) => root.city,
        id: (root) => root.id,
        // Esto ya es personalizado
        address: (root) => `${root.street}, ${root.city}`,
        check: () => "Anything"
    },

    MyResolver: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions, resolvers
})

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}`)
})