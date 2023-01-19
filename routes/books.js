const mongoose = require('mongoose');
console.log('befroe a file');
const Book = mongoose.model('Book');
console.log('eoe');

module.exports = app => {
  app.get('/api/books/testcount', async (req, res) => {
    const books = await Book.find();
    res.send(`${books.length}`);
  });
}
