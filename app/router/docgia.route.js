const express = require('express');
const router = express.Router();
const readerController = require('../controllers/docgia.controllers');

router.get('/', readerController.getAllReaders); // Lấy danh sách độc giả
router.post('/', readerController.createReader); // Thêm độc giả
router.put('/:id', readerController.updateReader); // Sửa thông tin độc giả
router.delete('/:id', readerController.deleteReader); // Xóa độc giả

module.exports = router;
