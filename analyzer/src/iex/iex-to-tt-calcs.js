
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

    return iexStats.map(statsObj => {

        // console.log('statsObj: ', statsObj)

        return {
            symbol: statsObj.symbol,
            trend_rate: calculateTrendRate(
                statsObj.day5ChangePercent,
                statsObj.month1ChangePercent,
                statsObj.month3ChangePercent,
                statsObj.month6ChangePercent
            ),
            dip_percentage: +statsObj.day5ChangePercent.toFixed(2),
            volume_ratio: +((statsObj.avg10Volume / statsObj.avg30Volume).toFixed(2)),
            market_cap_group: getMarketCapGroup(statsObj.marketcap),
            pe_ratio: +statsObj.peRatio.toFixed(2)
        }

    })
}

module.exports = {
    iexStatsToTtStats
}