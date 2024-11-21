const { MongoClient } = require("mongodb");
const config = require('../config/index'); // Import cấu hình từ config/index.js

const client = new MongoClient(config.db.uri, {

  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

client.connect().then(() => {
  db = client.db();
  console.log("Kết nối thành công tới MongoDB");
}).catch((err) => {
  console.log("Lỗi khi kết nối MongoDB:", err);
});

const getDb = () => db;

module.exports = { getDb };
