const { ObjectId } = require('mongodb');
const getDb = require('../utils/db');

// Lấy danh sách tất cả độc giả
exports.getAllDocgia = async (req, res) => {
    try {
        const db = getDb();
    const docgiaList = db.collection('docgia');
        // const docgiaList = await db.collection('docgia').find().toArray();
        res.status(200).json(docgiaList);
    } catch (error) {
        res.status(500).json({ error: "Không thể lấy danh sách độc giả." });
    }
};

// Thêm mới độc giả
exports.addDocgia = async (req, res) => {
    try {
        const db = getDb();
        const newDocgia = req.body;
        await db.collection('docgia').insertOne(newDocgia);
        res.status(201).json({ message: "Độc giả đã được thêm thành công." });
    } catch (error) {
        res.status(500).json({ error: "Không thể thêm độc giả." });
    }
};

// Xóa độc giả
exports.deleteDocgia = async (req, res) => {
    try {
        const db = getDb();
        const { id } = req.params;
        await db.collection('docgia').deleteOne({ _id: ObjectId(id) });
        res.status(200).json({ message: "Độc giả đã được xóa thành công." });
    } catch (error) {
        res.status(500).json({ error: "Không thể xóa độc giả." });
    }
};
