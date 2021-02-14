
const calculateTrendRate = require('../utils/trend-rate-calulator').calculateTrendRate

const getMarketCapGroup = (marketCapNum) => {

    if (marketCapNum < 300_000_000) {
        return 'Micro'
    }

    if (marketCapNum < 2_000_000_000) {
        return 'Small'
    }

    if (marketCapNum < 10_000_000_000) {
        return 'Mid'
    }

    if (marketCapNum < 200_000_000_000) {
        return 'Large'
    }

    return 'Mega'
}

const iexStatsToTtStats = iexStats => {

    // console.log('full stats array: ', iexStats)

    const ttStats = []
    const intermediateStats = []

    iexStats.forEach(statsObj => {

        const [niceSlope, dailyChangePercentages] = calculateTrendRate(
            statsObj.day5ChangePercent,
            statsObj.month1ChangePercent,
            statsObj.month3ChangePercent,
            statsObj.month6ChangePercent
        )

        // console.log('stuff from trend rate: ', niceSlope, ' ', dailyChangePercentages)

        ttStats.push({
            symbol: statsObj.symbol,
            trend_rate: niceSlope,
            dip_percentage: statsObj.day5ChangePercent ? +(+statsObj.day5ChangePercent * 100).toFixed(2) : undefined,
            volume_ratio: +((statsObj.avg10Volume / statsObj.avg30Volume).toFixed(2)),
            market_cap_group: getMarketCapGroup(statsObj.marketcap),
            pe_ratio: statsObj.peRatio ? +(+(statsObj.peRatio).toFixed(2)) : undefined
        })

        // console.log('dailyChangePercentages ', dailyChangePercentages)

        intermediateStats.push({
            symbol: statsObj.symbol,
            cumulative_percentage_changes: {
                '5d': statsObj.day5ChangePercent,
                '1m': statsObj.month1ChangePercent,
                '3m': statsObj.month3ChangePercent
            },
            interval_daily_percentage_changes: dailyChangePercentages,
            volume_metrics: {
                '10d': statsObj.avg10Volume,
                '30d': statsObj.avg30Volume,
            }
        })
    })

    // console.log('intermediateStats, ', intermediateStats)
    // console.log('ttStats, ', ttStats)
    return [ttStats, intermediateStats]
}

module.exports = {
    iexStatsToTtStats
}