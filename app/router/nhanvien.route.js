const express = require("express");
const nhanvien = require("../controllers/nhanvien.controllers");

const router = express.Router();



// Route đăng ký
router.post("/nhanvien/register", nhanvien.register);

// Route đăng nhập
router.post("/login", nhanvien.login);

module.exports = router;

// module.exports = router;