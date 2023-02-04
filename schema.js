const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    books: [Book]
  }

  type TName {
    en: String
    ru: String
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
`;

module.exports = typeDefs;
