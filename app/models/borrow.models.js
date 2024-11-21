const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  madg: { type: Number, required: true },
  masach: { type: String, required: true },
  ngaymuon: { type: String, required: true },
  ngaytra: { type: String, default: null },
  tinhtrang: { type: Boolean, default: false },
});

module.exports = mongoose.model('Borrow', BorrowSchema);
