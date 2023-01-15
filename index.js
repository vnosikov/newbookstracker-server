require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

require('./models/Book');

const app = express();

const connectionString = `mongodb+srv://adminprod:${process.env.MONGODB_KEY}@prodcluster.pc2bg.mongodb.net/newdb?retryWrites=true&w=majority`
mongoose.connect(connectionString);

const Book = mongoose.model('Book');

app.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(`Hello world, ${books.length} books`);
});

app.listen(3000, () => {
  console.log('Listening');
});
