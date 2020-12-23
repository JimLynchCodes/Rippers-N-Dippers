
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

        console.log('ok : ', statsForSymbol.trend_rate, ' ', rankingsMaxMinsHolder.trend.max)

        // trend rate 
        if (statsForSymbol.trend_rate > rankingsMaxMinsHolder.trend.max) {
            console.log('new trend max ', statsForSymbol.trend_rate)
            rankingsMaxMinsHolder.trend.max = statsForSymbol.trend_rate
        }

        if (statsForSymbol.trend_rate < rankingsMaxMinsHolder.trend.min) {
            console.log('new trend min ', statsForSymbol.trend_rate)
            rankingsMaxMinsHolder.trend.min = statsForSymbol.trend_rate
        }

        // dip
        if (statsForSymbol.dip_percentage > rankingsMaxMinsHolder.dip.max) {
            console.log('new dip max ', statsForSymbol.dip_percentage)
            rankingsMaxMinsHolder.dip.max = statsForSymbol.dip_percentage
        }

        if (statsForSymbol.dip_percentage < rankingsMaxMinsHolder.dip.min) {
            console.log('new dip min ', statsForSymbol.dip_percentage)
            rankingsMaxMinsHolder.dip.min = statsForSymbol.dip_percentage
        }

        // volume 
        if (statsForSymbol.volume_ratio > rankingsMaxMinsHolder.volume.max) {
            rankingsMaxMinsHolder.volume.max = statsForSymbol.volume_ratio
            console.log('new volume max ', statsForSymbol.volume_ratio)
        }

        if (statsForSymbol.volume_ratio < rankingsMaxMinsHolder.volume.min) {
            console.log('new volume min ', statsForSymbol.volume_ratio)
            rankingsMaxMinsHolder.volume.min = statsForSymbol.volume_ratio
        }

    });

    rankingsMaxMinsHolder.trend.min = Math.max(rankingsMaxMinsHolder.trend.min, MINIMUM_TREND_VALUE)
    rankingsMaxMinsHolder.trend.max = Math.min(rankingsMaxMinsHolder.trend.max, MAXIMUM_TREND_VALUE)

    rankingsMaxMinsHolder.dip.min = Math.max(rankingsMaxMinsHolder.dip.min, MINIMUM_DIP_VALUE)
    rankingsMaxMinsHolder.dip.max = Math.min(rankingsMaxMinsHolder.dip.max, MAXIMUM_DIP_VALUE)

    rankingsMaxMinsHolder.volume.min = Math.max(rankingsMaxMinsHolder.volume.min, MINIMUM_VOLUME_VALUE)
    rankingsMaxMinsHolder.volume.max = Math.min(rankingsMaxMinsHolder.volume.max, MAXIMUM_VOLUME_VALUE)

    console.log(`mins and maxes for ${upOrDown}`, rankingsMaxMinsHolder)

    const rankedStatsArray = preRankingsTtStatsArray
        .map(statsObj => {

            // const dipDistFromMin = statsObj.dip_percentage - Math.max(rankingsMaxMinsHolder.dip.min, MAXIMUM_DIP_VALUE)
            // const dipDistFromMax = rankingsMaxMinsHolder.dip.max - Math.min(statsObj.dip_percentage, MINIMUM_DIP_VALUE);

            // const trendDistFromMin = statsObj.trend_rate - Math.max(rankingsMaxMinsHolder.trend.min, MAXIMUM_TREND_VALUE)
            // const trendDistFromMax = rankingsMaxMinsHolder.trend.max - Math.min(statsObj.trend_rate, MINIMUM_TREND_VALUE);

            // const volumeDistFromMin = statsObj.volume_ratio - Math.max(rankingsMaxMinsHolder.volume.min, MAXIMUM_VOLUME_VALUE)
            // const volumeDistFromMax = rankingsMaxMinsHolder.volume.max - Math.min(statsObj.volume_ratio, MINIMUM_VOLUME_VALUE);

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
                (upOrDown === 'upwards') ?
                    dipDistFromMax / (dipDistFromMin + dipDistFromMax) :
                    dipDistFromMin / (dipDistFromMin + dipDistFromMax)

            // Math.min(dipDistFromMax / (dipDistFromMin + dipDistFromMax), MAXIMUM_DIP_VALUE) :
            // Math.max(dipDistFromMin / (dipDistFromMin + dipDistFromMax), MINIMUM_DIP_VALUE)

            // let dipRanking = 0

            // if (dipDistFromMin >= dipDistFromMax) {
            //     dipRanking = 1
            // }
            // else {
            //     dipRanking = (upOrDown === 'upwards' ?
            //         dipDistFromMax / (dipDistFromMin + dipDistFromMax) :
            //         dipDistFromMin / (dipDistFromMin + dipDistFromMax))
            // }



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

    return [rankedStatsArray, rankingsMaxMinsHolder]
}

module.exports = {
    fillInRankings
} 