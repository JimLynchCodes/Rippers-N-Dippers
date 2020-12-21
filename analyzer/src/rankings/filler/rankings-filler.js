
// called with either trending_upwards or trending_downwards arrays
const fillInRankings = (preRankingsTtStatsArray, upOrDown) => {

    if (upOrDown !== 'upwards' && upOrDown !== 'downwards')
        throw new Error('"upOrDown" must be either upwards or downwards!')

    const rankingsMaxMinsHolder = {
        trend: {
            max: -Infinity,
            min: Infinity
        },
        dip: {
            max: -Infinity,
            min: Infinity

        },
        volume: {
            max: -Infinity,
            min: Infinity
        }
    }

    preRankingsTtStatsArray.forEach(statsForSymbol => {

        // trend rate 
        if (statsForSymbol.trend_rate > rankingsMaxMinsHolder.trend.max) {
            rankingsMaxMinsHolder.trend.max = statsForSymbol.trend_rate
        }

        if (statsForSymbol.trend_rate < rankingsMaxMinsHolder.trend.min) {
            rankingsMaxMinsHolder.trend.min = statsForSymbol.trend_rate
        }

        // dip
        if (statsForSymbol.dip_percentage > rankingsMaxMinsHolder.dip.max) {
            rankingsMaxMinsHolder.dip.max = statsForSymbol.dip_percentage
        }

        if (statsForSymbol.dip_percentage < rankingsMaxMinsHolder.dip.min) {
            rankingsMaxMinsHolder.dip.min = statsForSymbol.dip_percentage
        }

        // volume 
        if (statsForSymbol.volume_ratio > rankingsMaxMinsHolder.volume.max) {
            rankingsMaxMinsHolder.volume.max = statsForSymbol.volume_ratio
        }

        if (statsForSymbol.volume_ratio < rankingsMaxMinsHolder.volume.min) {
            rankingsMaxMinsHolder.volume.min = statsForSymbol.volume_ratio
        }

    });

    console.log(`mins and maxes for ${upOrDown}`, rankingsMaxMinsHolder)

    return preRankingsTtStatsArray
        .filter(statsObj => statsObj.trend_rate !== 'N/T')
        .map(statsObj => {

            const dipDistFromMin = statsObj.dip_percentage - rankingsMaxMinsHolder.dip.min
            const dipDistFromMax = rankingsMaxMinsHolder.dip.max - statsObj.dip_percentage;

            const trendDistFromMin = statsObj.trend_rate - rankingsMaxMinsHolder.trend.min
            const trendDistFromMax = rankingsMaxMinsHolder.trend.max - statsObj.trend_rate;

            const volumeDistFromMin = statsObj.volume_ratio - rankingsMaxMinsHolder.volume.min
            const volumeDistFromMax = rankingsMaxMinsHolder.volume.max - statsObj.volume_ratio;

            /**
             *   Dip:
             *     Upwards - higher is better
             *     Downwards - lower is better
             */
            const trendRanking = (trendDistFromMin === trendDistFromMax) ?
                1 :
                (upOrDown === 'upwards' ?
                    trendDistFromMin / (trendDistFromMin + trendDistFromMax) :
                    trendDistFromMax / (trendDistFromMin + trendDistFromMax))

            /**
             *   Dip:
             *     Upwards - lower is better
             *     Downwards - higher is better
             */
            const dipRanking = (dipDistFromMin === dipDistFromMax) ?
                1 :
                (upOrDown === 'upwards' ?
                    dipDistFromMax / (dipDistFromMin + dipDistFromMax) :
                    dipDistFromMin / (dipDistFromMin + dipDistFromMax))

            // Volume - Higher is always better
            const volumeRanking = (volumeDistFromMin === volumeDistFromMax) ?
                1 :
                volumeDistFromMin / (volumeDistFromMin + volumeDistFromMax)

            statsObj.rankings = {
                trend: +trendRanking.toFixed(2),
                dip: +dipRanking.toFixed(2),
                volume: +volumeRanking.toFixed(2)
            }

            return statsObj
        })
}

module.exports = {
    fillInRankings
} 