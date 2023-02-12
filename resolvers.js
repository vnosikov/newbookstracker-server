const mongoose = require('mongoose');

const Book = mongoose.model('Book');
const Author = mongoose.model('Author');


const resolvers = {
  Query: {
    books: async () => {
      const books = await Book.find();
      const updatedBooks = await Promise.all(books.map(async(b, i) => {
        const decodedAuthors = await Promise.all(b.authorsIds.map(async authorId => {
          const result = await Author.findOne({_id: authorId });
          return {
            ru: result.name.ru ?? null,
            en: result.name.en ?? null,
          };
        }));
        const refsNumber = getReverseRefs(books, b._id).length;
        return {
          id: b._id,
          authors: decodedAuthors,
          title: b.title,
          refsNumber,
          read: b.read,
          marked: b.marked,
          mainLang: b.mainLang,
        };
      }));
      return updatedBooks.sort((a, b) => b.refsNumber - a.refsNumber);
    },
  }
};

const getReverseRefs = (books, targetId) =>
  books.filter(b => b.references.includes(targetId)).map(b => b._id); 

  module.exports = resolvers;
