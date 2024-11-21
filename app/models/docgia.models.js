
// server/app/models/docgia.models.js
const { MongoClient } = require('mongodb');
const config = require('../config');

// URL kết nối tới MongoDB
const url = config.db.uri;
const dbName = 'QuanLyMuonSach';

async function getDb() {
  const client = new MongoClient(url);
  await client.connect();
  return client.db(dbName);
}

async function getAllDocgia() {
  const db = await getDb();
  const collection = db.collection('docgia');
  return await collection.find().toArray();
}

async function addDocgia(docgia) {
  const db = await getDb();
  const collection = db.collection('docgia');
  const result = await collection.insertOne(docgia);
  return result.ops[0];
}

async function deleteDocgia(madg) {
  const db = await getDb();
  const collection = db.collection('docgia');
  await collection.deleteOne({ madg });
}

async function updateDocgia(madg, updatedDocgia) {
  const db = await getDb();
  const collection = db.collection('docgia');
  const result = await collection.updateOne({ madg }, { $set: updatedDocgia });
  return result.matchedCount > 0;
}

module.exports = { getAllDocgia, addDocgia, deleteDocgia, updateDocgia };
