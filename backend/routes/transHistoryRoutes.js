const express = require('express');
const router = express.Router();
const transHistoryController = require('../controllers/transHistoryController');

router.get('/trans_history', transHistoryController.getAllTransactions);
router.get('/trans_history/get/:id', transHistoryController.getAllTransactionsbyId);
router.post('/trans_history/create', transHistoryController.createTransaction);
router.put('/trans_history/update/:id', transHistoryController.updateTransactionById);
router.delete('/trans_history/delete/:id', transHistoryController.deleteTransactionById);
router.delete('/trans_history/delete', transHistoryController.deleteTransactionsById);

module.exports = router;