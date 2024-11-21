
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NhanVienService = require("../services/nhanvien.services");
const MongoDB = require("../utils/mongodb.utils");

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { msnv, hotennv, password, diachi, sdtnv } = req.body;

    // Kết nối tới cơ sở dữ liệu
      // const nhanvien = new NhanVienService(MongoDB.client);
      // const document = await nhanvien.register(req.body);
    await client.connect();
    const database = client.db("QuanLyMuonSach");
    const collection = database.collection("nhanvien");

    // Kiểm tra xem mã số nhân viên đã tồn tại chưa
    const existingUser = await collection.findOne({ msnv });
    if (existingUser) {
      return res.status(400).json({ message: "Nhân viên đã tồn tại!" });
    }

    // Thêm nhân viên mới
    const result = await collection.insertOne({
      msnv,
      hotennv,
      password,
      diachi,
      sdtnv,
    });

    res.status(201).json({ message: "Đăng ký thành công", data: result });
  } catch (error) {
    console.error("Lỗi trong API /register:", error);
    res.status(500).json({ message: "Lỗi server" });
  } finally {
    await client.close();
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { msnv, password } = req.body;
  
  try {
    const user = await NhanVien.findOne({ msnv });
    if (!user) {
      return res.status(400).json({ message: "Nhân viên không tồn tại!" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu sai!" });
    }
    
    const token = jwt.sign({ msnv: user.msnv }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
};
