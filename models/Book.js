const mongoose = require('mongoose');

const { Schema } = mongoose;

const TitleSchema = new Schema({
  en: String,
  ru: String,
});

const BookSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, ref: 'User '},
  authorsIds: Array,
  mainLang: String,
  marked: Boolean,
  read: Boolean,
  references: Array,
  tags: Array,
  title: TitleSchema,
  // type: { type: Schema.Types.ObjectId, ref: 'Type '},
  type: Schema.Types.Mixed,
});

mongoose.model('Book', BookSchema);