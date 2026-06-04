const express = require('express');
const router = express()
const {getAllBooks, addBook, updateBook, deleteBook} = require('../controllers/BooksController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/books', authenticateToken, getAllBooks);
router.post('/books', authenticateToken, authorizeRoles('admin'), addBook);
router.put('/books/:id', authenticateToken, authorizeRoles('admin'), updateBook);
router.delete('/books/:id', authenticateToken, authorizeRoles('admin'), deleteBook);

module.exports = router;