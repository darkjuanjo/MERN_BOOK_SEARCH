const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
}

input book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
}

type User {
    _id: String
    username: String
    email: String
    bookCount:Int
    savedBooks: [Book]
  }

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    login(username:String!, password: String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    saveBook(save:book!): User
    removeBook(bookId:String!): User
}

`;

module.exports = typeDefs;
