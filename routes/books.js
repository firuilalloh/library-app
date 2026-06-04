const express = require('express');
const router = express.Router();
const {getAllBooks, addBook, updateBook, deleteBook} = require('../controllers/BooksController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/books', authenticateToken, authorizeRoles('admin'), getAllBooks);
router.post('/books', authenticateToken, authorizeRoles('admin'), addBook);
router.patch('/books/:id', authenticateToken, authorizeRoles('admin'), updateBook);
router.delete('/books/:id', authenticateToken, authorizeRoles('admin'), deleteBook);

module.exports = router;