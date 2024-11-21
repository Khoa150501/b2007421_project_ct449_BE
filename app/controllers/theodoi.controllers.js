const { getDb } = require('../utils/db');  // Import kết nối DB

const getAllBorrows = async (req, res) => {
  try {
    const db = getDb();
    const borrowsCollection = db.collection('theodoimuonsach');
    const borrows = await borrowsCollection.aggregate([
      {
        $lookup: {
          from: 'docgia',  // Liên kết với bảng docgia
          localField: 'madg',
          foreignField: 'madg',
          as: 'docgia_info'
        }
      },
      {
        $lookup: {
          from: 'sach',  // Liên kết với bảng sach
          localField: 'masach',
          foreignField: 'masach',
          as: 'sach_info'
        }
      },
      {
        $unwind: '$docgia_info'  // Gộp thông tin độc giả
      },
      {
        $unwind: '$sach_info'  // Gộp thông tin sách
      }
    ]).toArray();

    res.json(borrows);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu mượn sách:", error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu mượn sách.", error });
  }
};

const addBorrow = async (req, res) => {
  try {
    const { madg, masach, ngaymuon, ngaytra, tinhtrang } = req.body;
    const db = getDb();
    const borrowsCollection = db.collection('theodoimuonsach');
    const newBorrow = { madg, masach, ngaymuon, ngaytra, tinhtrang };
    const result = await borrowsCollection.insertOne(newBorrow);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error("Lỗi khi thêm phiếu mượn:", error);
    res.status(500).json({ message: "Lỗi khi thêm phiếu mượn.", error });
  }
};

const updateReturnStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { ngaytra, tinhtrang } = req.body;
    const db = getDb();
    const borrowsCollection = db.collection('theodoimuonsach');
    const updatedBorrow = await borrowsCollection.updateOne(
      { _id: new ObjectId(id) },  // Chuyển id thành ObjectId
      { $set: { ngaytra, tinhtrang } }
    );
    res.json(updatedBorrow);
  } catch (error) {
    console.error("Lỗi khi cập nhật tình trạng trả sách:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật tình trạng trả sách.", error });
  }
};

module.exports = { getAllBorrows, addBorrow, updateReturnStatus };
