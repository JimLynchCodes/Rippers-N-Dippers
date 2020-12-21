require('dotenv').config()
const moment = require('moment')
const mongoFunctions = require('./db/mongo-functions')
const iexCaller = require('./iex/iex-caller')
const iexStatsToTtStats = require('./iex/iex-to-tt-calcs').iexStatsToTtStats
const insert = mongoFunctions.insert
const readLatest = mongoFunctions.readLatest

const fillInRankings = require('./rankings/filler/rankings-filler').fillInRankings
const sortByRankings = require('./rankings/sorter/rankings-sorter').sortByRankings
const getUniqueSymbols = require('./utils/get-unique-symbols').getUniqueSymbols
const splitIntoChunks = require('./utils/array-chunker').splitIntoChunks

const logger = require('./utils/logger')

/**
 *  Analyzes scraped US sector data (triple trender's algo) for the current day.
 */

const main = async () => {

    return new Promise(async resolve => {

        const currentDay = moment().format('MMMM Do YYYY')
        const currentTime = moment().format('h:mm:ss a')

        logger.info(`Starting the TT Analyzer! ${currentDay} ${currentTime}\n`)

        const scrapedData = await readLatest()

        const uniqueSymbols = getUniqueSymbols(scrapedData)

        const chunkedUniqueGainersAndLosers = {
            gainers: splitIntoChunks(uniqueSymbols.gainers, process.env.MAX_SYMBOLS_PER_LIST),
            losers: splitIntoChunks(uniqueSymbols.losers, process.env.MAX_SYMBOLS_PER_LIST)
        }

        const keyStats = {
            gainers: await iexCaller.getKeyStatsList(chunkedUniqueGainersAndLosers.gainers),
            losers: await iexCaller.getKeyStatsList(chunkedUniqueGainersAndLosers.losers),
        }

        // console.log('key stats are: ', JSON.stringify(keyStats))

        const ttStatsWithoutRankings = {
            trending_upwards: iexStatsToTtStats(keyStats.gainers),
            trending_downwards: iexStatsToTtStats(keyStats.losers)
        }

        // console.log('ttStatsWithoutRankings are: ', ttStatsWithoutRankings)

        const ttStatsUnsorted = {
            trending_upwards: fillInRankings(ttStatsWithoutRankings.trending_upwards, 'upwards'),
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

main()
    .then(() => {
        process.exit()
    })
    .catch(err => {
        logger.error(err)
    })