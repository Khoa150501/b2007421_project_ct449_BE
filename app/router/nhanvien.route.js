const express = require("express");
const nhanvien = require("../controllers/nhanvien.controllers");

const router = express.Router();

router.route("/")
    .get(nhanvien.findAll)
    .post(nhanvien.create)
    .delete(nhanvien.deleteAll);

router.route("/NHANVIEN")
    .get(nhanvien.findAllFavorite);

router.route("./:id")
.get(nhanvien.findOne)
.put(nhanvien.update)
.delete(nhanvien.delete);

module.exports = router;