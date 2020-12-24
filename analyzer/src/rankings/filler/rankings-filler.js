
const MAXIMUM_DIP_VALUE = 20;
const MINIMUM_DIP_VALUE = -20;

const MAXIMUM_VOLUME_VALUE = 200;
const MINIMUM_VOLUME_VALUE = -200;

const MAXIMUM_TREND_VALUE = 50;
const MINIMUM_TREND_VALUE = -50;

/**
 * @param { Array<TtStats> } preRankingsTtStatsArray - trending_upwards or trending_downwards arrays of pre-ranking'ed stats objects
 * @param { string } upOrDown - one of the literal strings 'upwards' or 'downwards'
 * 
 * @returns { Array<TtStats | RankingsMaxesAndMins> } 
 * 
 * maxesAndMins and straight up mathematical comparison maxes and mins
 *
 * rankings takes into account upwards or downwards
 */
const fillInRankings = (preRankingsTtStatsArray, upOrDown) => {

    if (upOrDown !== 'upwards' && upOrDown !== 'downwards')
        throw '"upOrDown" must be either upwards or downwards!'

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
        if (statsForSymbol.trend_rate > rankingsMaxMinsHolder.trend.max &&
            !statsForSymbol.isOutlier.trend_rate)
            rankingsMaxMinsHolder.trend.max = statsForSymbol.trend_rate

        if (statsForSymbol.trend_rate < rankingsMaxMinsHolder.trend.min &&
            !statsForSymbol.isOutlier.trend_rate)
            rankingsMaxMinsHolder.trend.min = statsForSymbol.trend_rate

        // dip
        if (statsForSymbol.dip_percentage > rankingsMaxMinsHolder.dip.max &&
            !statsForSymbol.isOutlier.dip)
            rankingsMaxMinsHolder.dip.max = statsForSymbol.dip_percentage

        if (statsForSymbol.dip_percentage < rankingsMaxMinsHolder.dip.min &&
            !statsForSymbol.isOutlier.dip)
            rankingsMaxMinsHolder.dip.min = statsForSymbol.dip_percentage

        // volume 
        if (statsForSymbol.volume_ratio > rankingsMaxMinsHolder.volume.max &&
            !statsForSymbol.isOutlier.volume)
            rankingsMaxMinsHolder.volume.max = statsForSymbol.volume_ratio

        if (statsForSymbol.volume_ratio < rankingsMaxMinsHolder.volume.min &&
            !statsForSymbol.isOutlier.volume)
            rankingsMaxMinsHolder.volume.min = statsForSymbol.volume_ratio

    });

    console.log(`mins and maxes for ${upOrDown}`, rankingsMaxMinsHolder)

    const rankedStatsArray = preRankingsTtStatsArray
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
            let trendRanking = (trendDistFromMin === trendDistFromMax) ?
                1 :
                (upOrDown === 'upwards' ?
                    trendDistFromMin / (trendDistFromMin + trendDistFromMax) :
                    trendDistFromMax / (trendDistFromMin + trendDistFromMax))

            if (statsObj.trend_rate > rankingsMaxMinsHolder.trend.max)
                trendRanking = upOrDown === 'upwards' ? 1 : 0

            if (statsObj.trend_rate < rankingsMaxMinsHolder.trend.min)
                trendRanking = upOrDown === 'upwards' ? 0 : 1

            /**
             *   Dip:
             *     Upwards - lower is better
             *     Downwards - higher is better
             */
            let dipRanking = (dipDistFromMin === dipDistFromMax) ?
                1 :
                (upOrDown === 'upwards') ?
                    dipDistFromMax / (dipDistFromMin + dipDistFromMax) :
                    dipDistFromMin / (dipDistFromMin + dipDistFromMax)

            if (statsObj.dip_percentage > rankingsMaxMinsHolder.dip.max)
                dipRanking = upOrDown === 'upwards' ? 0 : 1

            if (statsObj.dip_percentage < rankingsMaxMinsHolder.dip.min)
                dipRanking = upOrDown === 'upwards' ? 1 : 0

            // Volume - Regardless of direction, our algo always considers higher volume to be better
            let volumeRanking = (volumeDistFromMin === volumeDistFromMax) ?
                1 :
                volumeDistFromMin / (volumeDistFromMin + volumeDistFromMax)

            if (statsObj.volume_ratio > rankingsMaxMinsHolder.volume.max)
                volumeRanking = 1

            if (statsObj.volume_ratio < rankingsMaxMinsHolder.volume.min)
                volumeRanking = 0

            statsObj.rankings = {
                trend: +trendRanking.toFixed(2),
                dip: +dipRanking.toFixed(2),
                volume: +volumeRanking.toFixed(2)
            }

            return statsObj
        })

    return [rankedStatsArray, rankingsMaxMinsHolder]
}

module.exports = {
    fillInRankings
} 