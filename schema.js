const gql = require('graphql-tag');

const typeDefs = gql` 
  type Query {
    books: [Book]
  }

  type Mutation {
    login(username: String!, password: String!): SimplePostResponse!
    register(username: String!, password: String!): SimplePostResponse!
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Book {
    id: ID!
    authors: [TName]
    title: TName!
    refsNumber: Int!
    read: Boolean!
    marked: Boolean!
    mainLang: String!
  }

  type TName {
    en: String
    ru: String
  }

  type SimplePostResponse {
    code: Int!
    success: Boolean!
    message: String
  }
`;

module.exports = typeDefs;
