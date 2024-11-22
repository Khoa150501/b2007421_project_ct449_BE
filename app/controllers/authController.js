const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Thay bằng URI MongoDB của bạn
const client = new MongoClient(uri);
const database = client.db('QuanLyMuonSach');
const collection = database.collection('nhanvien');

// Đăng nhập
exports.login = async (req, res) => {
    const { msnv, password } = req.body;

    try {
        const user = await collection.findOne({ msnv, password });

        if (!user) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác!' });
        }

        const token = jwt.sign(
            { _id: user._id, msnv: user.msnv, hotennv: user.hotennv },
            'secret_key', // Thay bằng secret key bảo mật
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token,
            user: {
                _id: user._id,
                msnv: user.msnv,
                hotennv: user.hotennv,
                diachi: user.diachi,
                sdtnv: user.sdtnv
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server!', error: err.message });
    }
};
