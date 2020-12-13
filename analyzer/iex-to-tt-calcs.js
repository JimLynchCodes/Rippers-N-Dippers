
const calculateTrendRate = require('./trend-rate-calulator').calculateTrendRate

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

    console.log('iex stats ', iexStats);

    return Object.entries(iexStats).map(([symbol, statsObj]) => {

        console.log('stasObj: ', statsObj)

        console.log('symbol is', symbol, )
        console.log(' and pe ratio: ', statsObj.stats.peRatio)

        return {
            symbol,
            trend_rate: calculateTrendRate(
                statsObj.stats.day5ChangePercent,
                statsObj.stats.month1ChangePercent,
                statsObj.stats.month3ChangePercent,
                statsObj.stats.month6ChangePercent
            ),
            dip_percentage: +statsObj.stats.day5ChangePercent.toFixed(2),
            volume_ratio: +(statsObj.stats.avg10Volume / statsObj.stats.avg30Volume).toFixed(2),
            rankings: {
                trend: 1.00,
                dip: 0.87,
                volume: 0.65,
            },
            market_cap_group: getMarketCapGroup(statsObj.stats.marketcap),
            pe_ratio: +statsObj.stats.peRatio.toFixed(2)
        }

    })
}

module.exports = {
    iexStatsToTtStats
}