require('dotenv').config()
const moment = require('moment')
const mongoFunctions = require('./db/mongo-functions')
const iexCaller = require('./iex/iex-caller')
const iexStatsToTtStats = require('./iex/iex-to-tt-calcs').iexStatsToTtStats
const insert = mongoFunctions.insert
const readLatest = mongoFunctions.readLatest

const fillInRankings = require('./rankings/filler/rankings-filler').fillInRankings
const sortByRankings = require('./rankings/sorter/rankings-sorter').sortByRankings

const logger = require('./utils/logger')

/**
 *  Analyzes scraped US sector data (triple gainer's algo) for the current day.
 */

const main2 = async () => {

    return new Promise(async resolve => {

        const currentDay = moment().format('MMMM Do YYYY')
        const currentTime = moment().format('h:mm:ss a')

        logger.info(`Starting the TT Analyzer! ${currentDay} ${currentTime}\n`)

        const scrapedData = await readLatest()

        const uniqueSymbols = getUniqueSymbols(scrapedData)

        const keyStats = {
            gainers: await iexCaller.getKeyStatsList(uniqueSymbols.gainers),
            losers: await iexCaller.getKeyStatsList(uniqueSymbols.losers),
        }

        // console.log('key stats are: ', JSON.stringify(keyStats))
        
        const ttStatsWithoutRankings = {
            trending_upwards: iexStatsToTtStats(keyStats.gainers),
            trending_downwards: iexStatsToTtStats(keyStats.losers)
        }
        
        // console.log('ttStatsWithoutRankings are: ', ttStatsWithoutRankings)
        
        const ttStatsUnsorted = {
            trending_upwards: fillInRankings(ttStatsWithoutRankings.trending_upwards, 'upwards'),
            trending_downwards: fillInRankings(ttStatsWithoutRankings.trending_downwards, 'downwards')
        }
        
        const tt_stats = {
            trending_upwards: sortByRankings(ttStatsUnsorted.trending_upwards, 'upwards'),
            trending_downwards: sortByRankings(ttStatsUnsorted.trending_downwards, 'downwards')
        }

        // console.log('tt_stats are: ', JSON.stringify(tt_stats, null, 2))

        await insert({
            'date_analyzed': currentDay,
            'time_analyzed': currentTime,
            tt_stats
        })

        resolve('Successfully analyzed symbols!')
    })
}

const getUniqueSymbols = (scrapedData) => {

    let uniqueSymbols = {
        gainers: [],
        losers: []
    }

    Object.entries(scrapedData['categories']).forEach(([marketCap, gainersAndLosers]) => {

        Object.entries(gainersAndLosers).forEach(([gainerOrLoser, timePeriodData]) => {

            Object.entries(timePeriodData).forEach(([timePeriod, stocksData]) => {

                const symbolsWithHeaders = stocksData.map(stockDatum => stockDatum[0].trim())

                const symbols = symbolsWithHeaders.slice(1)

                uniqueSymbols[gainerOrLoser] = [...symbols, ...uniqueSymbols[gainerOrLoser]]
            })

            uniqueSymbols[gainerOrLoser] = Array.from(new Set(uniqueSymbols[gainerOrLoser]))

        })
    })

    return uniqueSymbols
}


main2()
    .then(() => {
        process.exit()
    })
    .catch(err => {
        logger.error(err)
    })