
// called with either trending_upwards or trending_downwards arrays
const fillInRankings = preRankingsTtStatsArray => {

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

    console.log('mins and maxes', rankingsMaxMinsHolder)

    return preRankingsTtStatsArray.map( statsObj => {

        //TODO - TREND RANKING
        
        const dipDistFromMin = statsObj.dip_percentage - rankingsMaxMinsHolder.dip.min 
        const dipDistFromMax = rankingsMaxMinsHolder.dip.max - statsObj.dip_percentage;
        const dipRanking = dipDistFromMin / (dipDistFromMin + dipDistFromMax)
    
        const volumeDistFromMin = statsObj.volume_ratio - rankingsMaxMinsHolder.volume.min 
        const volumeDistFromMax = rankingsMaxMinsHolder.volume.max - statsObj.volume_ratio;
        const volumeRanking = volumeDistFromMin / (volumeDistFromMin + volumeDistFromMax)
        
        statsObj.rankings = {
            trend: 0,
            dip: dipRanking,
            volume: volumeRanking,

        }

        return statsObj
    })
}

module.exports = {
    fillInRankings
}