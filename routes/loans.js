const exspress = require('express');
const router = exspress.Router();
const { getAllLoans, addLoan, updateLoan, deleteLoan } = require('../controllers/LoansController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/loans', authenticateToken, authorizeRoles(['admin']), getAllLoans);
router.post('/loans', authenticateToken, authorizeRoles(['admin']), addLoan);
router.patch('/loans/:id', authenticateToken, authorizeRoles(['admin']), updateLoan);
router.delete('/loans/:id', authenticateToken, authorizeRoles(['admin']), deleteLoan);

module.exports = router
