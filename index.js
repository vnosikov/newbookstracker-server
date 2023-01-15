require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

require('./models/Book');

const app = express();
const PORT = process.env.PORT || 3000;

const Book = mongoose.model('Book');

const connectionString = `mongodb+srv://adminprod:${process.env.MONGODB_KEY}@prodcluster.pc2bg.mongodb.net/newdb?retryWrites=true&w=majority`;

app.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(`Hello world, ${books.length} books`);
});

mongoose.connect(connectionString).then(
  () => {
    app.listen(PORT, () => {
      console.log('Listening');
    });
  }
);
