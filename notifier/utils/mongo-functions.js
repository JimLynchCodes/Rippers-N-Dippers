/**
 * Mongo-related functions for the Triple Trenders notifier.
 */

const MongoClient = require('mongodb').MongoClient;

/**
 *  Pulls latest stocks analysis document from the given collection set in .env
 */
const readStocksTtAnalysis = () => {

    return new Promise((resolve, reject) => {

        MongoClient.connect(process.env.MONGO_URI, async (err, db) => {
            if (err) throw err

            console.log('connected to mongo collection to read sector scrapes from: ', process.env.STOCKS_TT_ANALYSIS_COLLECTION)

            var dbo = db.db(process.env.DATABASE_NAME)

            const stocks_analysis_data = await dbo.collection(process.env.STOCKS_TT_ANALYSIS_COLLECTION)
                .find()
                .sort({ '_id': -1 })
                .limit(1)
                .next()

            resolve(stocks_analysis_data)
        })
    })
}

module.exports = {
    readStocksTtAnalysis
}