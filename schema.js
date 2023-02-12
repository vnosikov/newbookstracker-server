const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    books: [Book]
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
`;

module.exports = typeDefs;
