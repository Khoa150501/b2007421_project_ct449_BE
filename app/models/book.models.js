const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  masach: { type: String, unique: true, required: true },
  tensach: String,
  dongia: Number,
  soquyen: Number,
  namxb: String,
  maxb: String,
  tacgia: String,
});

module.exports = mongoose.model('Book', BookSchema);
