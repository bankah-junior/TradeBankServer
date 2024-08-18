const mongoose = require('mongoose')

const tradeHistorySchema = new mongoose.Schema({
    symbol: {
      type: String,
      required: true  
    },
    type: {
        type: String,
        required: true
    },
    openDate: {
        type: String,
        required: true
    },
    closeDate: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    lot: {
        type: Number,
        required: true
    },
    positionPnL: {
        type: Number,
        required: true
    },
    totalPnL: {
        type: Number,
        required: true
    },
    ticket: {
        type: String,
        required: true
    },
    strategy: {
        type: String,
        required: true
    },
    swap: {
        type: String,
        required: true
    },
    commission: {
        type: String,
        required: true
    },
})


tradeHistorySchema.statics.getTrades = async function() {
    try {
        const trades = await this.find({});
        const result = [];
        trades.map((trade) => {
            result.push({
                ticket: trade.ticket,
                type: trade.type,
                symbol: trade.symbol,
                lot: trade.lot,
                openDate: trade.openDate,
                closeDate: trade.closeDate,
                duration: trade.duration,
                swap: trade.swap,
                commission: trade.commission,
                positionPnL: trade.positionPnL,
                totalPnL: trade.totalPnL,
                comment: trade.comment,
                strategy: trade.strategy,
            });
        });
        return result;
    } catch (error) {
        throw error;
    }
}


tradeHistorySchema.statics.getStrategyTrades = async function(strategy) {
    try {
        const trades = await this.find({ strategy });
        const result = [];
        trades.map((trade) => {
            result.push({
                ticket: trade.ticket,
                type: trade.type,
                symbol: trade.symbol,
                lot: trade.lot,
                openDate: trade.openDate,
                closeDate: trade.closeDate,
                duration: trade.duration,
                swap: trade.swap,
                commission: trade.commission,
                positionPnL: trade.positionPnL,
                totalPnL: trade.totalPnL,
                comment: trade.comment,
                strategy: trade.strategy,
            });
        });
        return result;
    } catch (error) {
        throw error;
    }
}


tradeHistorySchema.statics.getSummary = async function() {
    try {
        const trades = await this.find({});
        let total = trades.length;
        let typesBuy = trades.filter(trade => trade.type === "sell").length;
        let typesSell = trades.filter(trade => trade.type === "buy").length;

        return {total, typesBuy, typesSell};
    } catch (error) {
        throw error;
    }
}

tradeHistorySchema.statics.getSummaryByStrategy = async function(strategy) {
    try {
        const trades = await this.find({ strategy });
        let total = trades.length;
        let typesBuy = trades.filter(trade => trade.type === "buy").length;
        let typesSell = trades.filter(trade => trade.type === "sell").length;
        let positionPnLPositive = trades.filter(trade => trade.positionPnL > 0).length;
        let positionPnLNegative = trades.filter(trade => trade.positionPnL < 0).length;

        return {total, typesBuy, typesSell, positionPnLPositive, positionPnLNegative};
    } catch (error) {
        throw error;
    }
}


tradeHistorySchema.statics.getSymbolProfit = async function() {
    try {
        const trades = await this.find({}, { symbol: 1, positionPnL: 1 });
        return trades.map(el => ({ symbol: el.symbol, positionPnL: el.positionPnL }));
    } catch (error) {
        throw error;
    }
}

tradeHistorySchema.statics.getSymbolProfitByStrategy = async function(strategy) {
    try {
        const trades = await this.find({ strategy }, { symbol: 1, positionPnL: 1 });
        return trades.map(el => ({ symbol: el.symbol, positionPnL: el.positionPnL }));
    } catch (error) {
        throw error;
    }
}


tradeHistorySchema.statics.deleteTradesByStrategy = async function(strategy) {
    try {
        const trades = await this.deleteMany({ strategy });
        return trades;
    } catch (error) {
        throw error;
    }
}

tradeHistorySchema.statics.deleteTradeByTicket = async function(ticket) {
    try {
        const trade = await this.deleteOne({ ticket });
        return trade;
    } catch (error) {
        throw error;
    }
}

tradeHistorySchema.statics.getPositionPnLPositivesAndNegatives= async function() {
    try {
        const trades = await this.find({ strategy }, { positionPnL: 1 });
        const positives = trades.reduce((sum, trade) => sum + (trade.positionPnL > 0 ? trade.positionPnL : 0), 0);
        const negatives = trades.reduce((sum, trade) => sum + (trade.positionPnL < 0 ? trade.positionPnL : 0), 0);
        // const positives = trades.filter(trade => trade.positionPnL > 0).length;
        // const negatives = trades.filter(trade => trade.positionPnL < 0).length;
        return [ {name: "Positive", value: positives}, {name: "Negative", value: negatives *-1} ];
    } catch (error) {
        throw error;
    }
}

tradeHistorySchema.statics.getPositionPnLPositivesAndNegativesByStrategy = async function(strategy) {
    try {
        const trades = await this.find({ strategy }, { positionPnL: 1 });
        const positives = trades.reduce((sum, trade) => sum + (trade.positionPnL > 0 ? trade.positionPnL : 0), 0);
        const negatives = trades.reduce((sum, trade) => sum + (trade.positionPnL < 0 ? trade.positionPnL : 0), 0);
        // const positives = trades.filter(trade => trade.positionPnL > 0).length;
        // const negatives = trades.filter(trade => trade.positionPnL < 0).length;
        return [ {name: "Positive", value: positives}, {name: "Negative", value: negatives *-1} ];
    } catch (error) {
        throw error;
    }
}

const TradeHistory = mongoose.model('TradeHistory', tradeHistorySchema)

module.exports = TradeHistory