
/**
 *  Called with either trending_upwards or trending_downwards arrays
 *  
 *  The previous rankings filler step consider if it
 * 
 **/
const sortByRankings = (unsortedTtStatsArray) => {

    return unsortedTtStatsArray.sort((ttStatsObjA, ttStatsObjB) => {

        return (ttStatsObjA.rankings.trend + ttStatsObjA.rankings.dip + ttStatsObjA.rankings.volume) <
            (ttStatsObjB.rankings.trend + ttStatsObjB.rankings.dip + ttStatsObjB.rankings.volume) ?
            1 : -1
    })
}

module.exports = {
    sortByRankings
} 