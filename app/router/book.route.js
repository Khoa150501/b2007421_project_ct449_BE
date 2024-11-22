const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controllers');

// Get all books
router.get('/', bookController.getAllBooks);

//search
router.get('/search', bookController.searchBooks);

// Add a new book
router.post('/api/books', bookController.addBook);

// Update a book
router.put('/api/books/:id', bookController.updateBook);

// Delete a book
router.delete('/api/books/:id', bookController.deleteBook);

module.exports = router;
