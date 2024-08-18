const TradeHistory = require('../models/tradeHistory.model');

// Create tradeHistory
exports.addTrade = (req, res) => {
    const { ticket, type, symbol, lot, openDate, closeDate, duration,  swap, commission, positionPnL, totalPnL, comment, strategy } = req.body;
    
    try {
        TradeHistory.findOneAndUpdate({ ticket }, { ticket, type, symbol, lot, openDate, closeDate, duration,  swap, commission, positionPnL, totalPnL, comment, strategy }, { upsert: true, new: true })
        .then(tradeHistory => {
            res.status(200).json({
                message: 'Trade History Added Successfully',
                tradeHistory: tradeHistory
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Create Trade History Failed',
                error: error
            });
        });
    } catch (error) {
        res.status(500).json({
            message: 'Create Trade History Failed',
            error: error
        });
    }
    
};

// Get all tradeHistory
exports.getAllTradeHistory = (req, res) => {
    TradeHistory.getTrades()
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Get All Trade History Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Get All Trade History Failed',
            error: err
        });
    });
};

// Get tradeHistory by strategy
exports.getStrategyTrades = (req, res) => {
    TradeHistory.getStrategyTrades(req.params.strategy)
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Get Strategy Trade History Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Get Strategy Trade History Failed',
            error: err
        });
    });
};

// Get summary
exports.getSummary = (req, res) => {
    TradeHistory.getSummary()
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Get Summary Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Get Summary Failed',
            error: err
        });
    });
};

// Get summary by strategy
exports.getSummaryByStrategy = (req, res) => {
    TradeHistory.getSummaryByStrategy(req.params.strategy)
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Get Summary By Strategy Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Get Summary By Strategy Failed',
            error: err
        });
    });
};

// Get symbol profit
exports.getSymbolProfit = (req, res) => {
    TradeHistory.getSymbolProfit()
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Get Symbol Profit Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Get Symbol Profit Failed',
            error: err
        });
    });
};

// Get symbol profit by strategy
exports.getSymbolProfitByStrategy = (req, res) => {
    TradeHistory.getSymbolProfitByStrategy(req.params.strategy)
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Get Symbol Profit By Strategy Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Get Symbol Profit By Strategy Failed',
            error: err
        });
    });
};

// Delete trades by strategy
exports.deleteTradesByStrategy = (req, res) => {
    TradeHistory.deleteTradesByStrategy(req.params.strategy)
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Delete Trades By Strategy Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Delete Trades By Strategy Failed',
            error: err
        });
    });
}

// Delete trade by ticket
exports.deleteTradeByTicket = (req, res) => {
    TradeHistory.deleteTradeByTicket(req.params.ticket)
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Delete Trade By Ticket Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Delete Trade By Ticket Failed',
            error: err
        });
    });
}

// getPositionPnLPositivesAndNegatives
exports.getPositionPnLPositivesAndNegatives = (req, res) => {
    TradeHistory.getPositionPnLPositivesAndNegatives()
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Get Position PnL Positives And Negatives Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Get Position PnL Positives And Negatives Failed',
            error: err
        });
    });
}

// getPositionPnLPositivesAndNegativesByStrategy
exports.getPositionPnLPositivesAndNegativesByStrategy = (req, res) => {
    TradeHistory.getPositionPnLPositivesAndNegativesByStrategy(req.params.strategy)
    .then((tradeHistory) => {
        res.status(200).json({
            message: 'Get Position PnL Positives And Negatives By Strategy Success',
            tradeHistory: tradeHistory
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Get Position PnL Positives And Negatives By Strategy Failed',
            error: err
        });
    });
}