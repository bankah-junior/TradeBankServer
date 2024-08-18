const express = require('express');
const router = express.Router();
const tradeHistoryController = require('../controllers/tradeHistoryController');

router.post('/addTrade', tradeHistoryController.addTrade);
router.get('/getAllTradeHistory', tradeHistoryController.getAllTradeHistory);
router.get('/getStrategyTrades/:strategy', tradeHistoryController.getStrategyTrades);
router.get('/getSummary', tradeHistoryController.getSummary);
router.get('/getSummaryByStrategy/:strategy', tradeHistoryController.getSummaryByStrategy);
router.get('/getSymbolProfit', tradeHistoryController.getSymbolProfit);
router.get('/getSymbolProfitByStrategy/:strategy', tradeHistoryController.getSymbolProfitByStrategy);
router.get('/getPositionPnLPositivesAndNegatives', tradeHistoryController.getPositionPnLPositivesAndNegatives);
router.get('/getPositionPnLPositivesAndNegativesByStrategy/:strategy', tradeHistoryController.getPositionPnLPositivesAndNegativesByStrategy);
router.delete('/deleteTradesByStrategy/:strategy', tradeHistoryController.deleteTradesByStrategy);
router.delete('/deleteTradeByTicket', tradeHistoryController.deleteTradeByTicket);

module.exports = router;
