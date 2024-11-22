const MongoDB = require('../utils/mongodb.utils');
const { ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Thay bằng URL MongoDB nếu cần
const dbName = 'QuanLyMuonSach'; // Tên database
const collectionName = 'docgia'; // Tên collection

// Lấy danh sách độc giả
const getAllReaders = async (req, res) => {
  try {
    const client = await MongoDB.connect(uri);
    const db = client.db(dbName);
    const readers = await db.collection(collectionName).find().toArray();
    res.json(readers);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách độc giả:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Thêm độc giả
const createReader = async (req, res) => {
  try {
    const client = await MongoDB.connect(uri);
    const db = client.db(dbName);
    const newReader = req.body;

    const result = await db.collection(collectionName).insertOne(newReader);
    res.status(201).json({ message: 'Độc giả đã được thêm', data: result.ops[0] });
  } catch (error) {
    console.error('Lỗi khi thêm độc giả:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Sửa thông tin độc giả
const updateReader = async (req, res) => {
  try {
    const client = await MongoDB.connect(uri);
    const db = client.db(dbName);
    const readerId = req.params.id;
    const updatedReader = req.body;

    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(readerId) },
      { $set: updatedReader }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy độc giả để cập nhật' });
    }

    res.json({ message: 'Cập nhật thông tin độc giả thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật độc giả:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// Xóa độc giả
const deleteReader = async (req, res) => {
  try {
    const client = await MongoDB.connect(uri);
    const db = client.db(dbName);
    const readerId = req.params.id;

    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(readerId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy độc giả để xóa' });
    }

    res.json({ message: 'Độc giả đã được xóa' });
  } catch (error) {
    console.error('Lỗi khi xóa độc giả:', error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

module.exports = {
  getAllReaders,
  createReader,
  updateReader,
  deleteReader,
};
