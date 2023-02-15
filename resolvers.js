const mongoose = require('mongoose');

const Book = mongoose.model('Book');
const Author = mongoose.model('Author');


const resolvers = {
  Query: {
    books: async () => {
      const books = await Book.find();
      const authorsIds = books.flatMap((b) => b.authorsIds);
      const authors = await Author.find({ _id: { $in: authorsIds } }).lean();
    
      const authorsMap = {};
      authors.forEach((author) => {
        authorsMap[author._id.toString()] = {
          ru: author.name.ru ?? null,
          en: author.name.en ?? null,
        };
      });
    
      const updatedBooks = books.map((b, i) => {
        const decodedAuthors = b.authorsIds.map((authorId) => authorsMap[authorId.toString()]);
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
      });
    
      return updatedBooks.sort((a, b) => b.refsNumber - a.refsNumber);
    }
  }
};

const getReverseRefs = (books, targetId) =>
  books.filter(b => b.references.includes(targetId)).map(b => b._id); 

  module.exports = resolvers;
