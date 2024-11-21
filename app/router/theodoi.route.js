const express = require('express');
const borrowController = require('../controllers/theodoi.controllers');
const router = express.Router();

router.get('/', borrowController.getAllBorrows);  // Lấy danh sách mượn sách
router.post('/', borrowController.addBorrow);     // Thêm phiếu mượn sách
router.put('/:id', borrowController.updateReturnStatus);  // Cập nhật tình trạng trả sách

module.exports = router;