const mongoose = require('mongoose');
const uuid = require('uuid');


const { Schema } = mongoose;

const NameSchema = new Schema({
  en: String,
  ru: String,
});

const AuthorSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: () => uuid(),
    index: { unique: true },
  },
  name: NameSchema,
  mainLang: String,
}, { _id: false });

mongoose.model('Author', AuthorSchema);