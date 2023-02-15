const mongoose = require('mongoose');
const uuid = require('uuid');


const { Schema } = mongoose;

const NameSchema = new Schema({
  en: String,
  ru: String,
});

const AuthorSchema = new Schema({
  name: NameSchema,
  mainLang: String,
}, { _id: false });

mongoose.model('Author', AuthorSchema);