const express = require('express');
const docgiaController = require('../controllers/docgia.controllers');

const router = express.Router();

// Lấy danh sách độc giả
router.get('/', docgiaController.getAllDocgia);

// Thêm độc giả mới
router.post('/', docgiaController.addDocgia);

// Xóa độc giả
router.delete('/:id', docgiaController.deleteDocgia);

module.exports = router;
