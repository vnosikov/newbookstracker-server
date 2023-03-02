const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  username: String,
  password: String,
});

mongoose.model('User', UserSchema);