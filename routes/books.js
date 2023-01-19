const mongoose = require('mongoose');
const Book = mongoose.model('Book');

module.exports = app => {
  app.get('/api/books/testcount', async (req, res) => {
    const books = await Book.find();
    res.send(`${books.length}`);
  });
}
