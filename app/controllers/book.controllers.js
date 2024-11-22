const MongoDB = require('../utils/mongodb.utils');
const BookService = require("../services/book.services");
const ApiError = require("../api-error");
// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const client = await MongoDB.connect(process.env.MONGODB_URI);
    const db = client.db('QuanLyMuonSach');
    const books = await db.collection('sach').find().toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const { masach, tensach, dongia, soquyen, namxb, maxb, tacgia } = req.body;
  
  const newBook = {
    masach,
    tensach,
    dongia,
    soquyen,
    namxb,
    maxb,
    tacgia,
  };

  try {
    const client = await MongoDB.connect(process.env.MONGODB_URI);
    const db = client.db('QuanLyMuonSach');
    const result = await db.collection('sach').insertOne(newBook);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error adding book', error });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { masach, tensach, dongia, soquyen, namxb, maxb, tacgia } = req.body;

  try {
    const client = await MongoDB.connect(process.env.MONGODB_URI);
    const db = client.db('QuanLyMuonSach');
    const updatedBook = await db.collection('sach').findOneAndUpdate(
      { _id: new MongoClient.ObjectID(id) },
      { $set: { masach, tensach, dongia, soquyen, namxb, maxb, tacgia } },
      { returnDocument: 'after' }
    );
    res.json(updatedBook.value);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoDB.connect(process.env.MONGODB_URI);
    const db = client.db('QuanLyMuonSach');
    await db.collection('sach').deleteOne({ _id: new MongoClient.ObjectID(id) });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting book', error });
  }
};
//tim kiem
exports.searchBooks = async (req, res, next) => {
  let books = [];
  const { query } = req.query; // Nhận tham số tìm kiếm từ query string

  try {
    const bookService = new BookService(MongoDB.client);

    if (query) {
      // Tìm kiếm sách theo từ khóa tìm kiếm
      books = await bookService.search(query);
    } else {
      books = await bookService.getAllBooks(); // Nếu không có query thì trả về tất cả sách
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving books")
    );
  }

  return res.send(books);
};
