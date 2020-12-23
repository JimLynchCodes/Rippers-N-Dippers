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
const markOutliers = require('./utils/outlier-marker/outlier-marker').markOutliers

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

        const [gainerTtStats, gainer_intermediate_trend_stats] = iexStatsToTtStats(keyStats.gainers)
        const [loserTtStats, loser_intermediate_trend_stats] = iexStatsToTtStats(keyStats.losers)
            
        // filters out non-trenders
        const trendingGainersTtStats = gainerTtStats.filter(statsObj => !isNaN(+statsObj.trend_rate))      
        const trendingLosersTtStats = loserTtStats.filter(statsObj => !isNaN(+statsObj.trend_rate))          

        console.log('gainer tt stats: ', trendingGainersTtStats)

        const [gainersTtStatsArrCheckedForOutliers, gainersOutliersObj] = markOutliers(trendingGainersTtStats)
        const [losersTtStatsArrCheckedForOutliers, losersOutliersObj] = markOutliers(trendingLosersTtStats)

        const ttStatsWithoutRankings = {
            trending_upwards: gainersTtStatsArrCheckedForOutliers,
            trending_downwards: losersTtStatsArrCheckedForOutliers
        }

        // console.log('ttStatsWithoutRankings are: ', ttStatsWithoutRankings)

        const [upwardsStatsObj, upwardsMaxesAndMins] = fillInRankings(ttStatsWithoutRankings.trending_upwards, 'upwards')
        const [downwardsStatsObj, downwardsMaxesAndMins] = fillInRankings(ttStatsWithoutRankings.trending_downwards, 'downwards')

        const ttStatsUnsorted = {
            trending_upwards: upwardsStatsObj,
            trending_downwards: downwardsStatsObj
        }

        const tt_stats = {
            trending_upwards: sortByRankings(ttStatsUnsorted.trending_upwards, 'upwards'),
            trending_downwards: sortByRankings(ttStatsUnsorted.trending_downwards, 'downwards')
        }

        // console.log('tt_stats are: ', JSON.stringify(tt_stats, null, 2))

        await insert({
            'date_analyzed': currentDay,
            'time_analyzed': currentTime,
            tt_stats,
            intermediate_calculations: {
                upwards: gainer_intermediate_trend_stats,
                downwards: loser_intermediate_trend_stats
            },
            maxes_and_mins: {
                trending_upwards: upwardsMaxesAndMins,
                trending_downwards: downwardsMaxesAndMins
            },
            outliers: {
                upwards: gainersOutliersObj,
                downwards: losersOutliersObj
            }
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