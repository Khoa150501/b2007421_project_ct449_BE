const ApiError = require("./app/api-error");
const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/router/contact.route");
const booksRouter = require("./app/router/book.route");
const docgiaRouter = require("./app/router/docgia.route");
const nxbRouter = require("./app/router/nxb.route");
const nhanvienRouter = require("./app/router/nhanvien.route");






const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Chào mừng bạn đến với thư viện!"});
});

app.use((err, req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
    });

app.use((err, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});
// app.use("/api/contacts", contactsRouter);
app.use("/api/docgia", docgiaRouter);
app.use("/api/books", booksRouter);
app.use("/api/nxb", nxbRouter);
app.use("/api/nhanvien", nhanvienRouter);




module.exports = app;