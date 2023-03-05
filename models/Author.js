const mongoose = require('mongoose');

const { Schema } = mongoose;

const NameSchema = new Schema({
  en: String,
  ru: String,
});

const AuthorSchema = new Schema({
  name: NameSchema,
  mainLang: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User '},
}, { _id: false });

mongoose.model('Author', AuthorSchema);