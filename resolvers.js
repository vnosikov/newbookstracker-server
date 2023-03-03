const mongoose = require('mongoose');

const Book = mongoose.model('Book');
const Author = mongoose.model('Author');
const User = mongoose.model('User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config(); 


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
  },

  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        return {
          code: 404,
          success: false,
          message: 'User doesn\'t exist',
        }
      }
      
      console.log('1');
      const correctPassword = await bcrypt.compare(password, user.password);
      if(!correctPassword){
        return {
          code: 401,
          success: false,
          message: 'Wrong password'
        }
      }
      
      console.log('2');
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      console.log('3');
      return {
        code: 200,
        success: true,
        message: token,
      };
    },

    register: async (_, { username, password }) => {
      if (username === '') {
        return {
          code: 400,
          success: false,
          message: 'Username not specified',
        }
      }
      const existingUser = await User.exists({ username });

      if(existingUser) {
        return {
          code: 409,
          success: false,
          message: 'User already exists',
        };
      }

      // I don't care for security as it is a pet-project who will be used by nobody except me
      // so I don't expect much from a password
      if (password.length <6) {
        return {
          code: 400,
          success: false,
          message: 'Password needs to have at least six symbols',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();

      return {
        code: 201,
        success: true,
        message: null,
      };
    },
  },
};

const getReverseRefs = (books, targetId) =>
  books.filter(b => b.references.includes(targetId)).map(b => b._id); 

  module.exports = resolvers;
