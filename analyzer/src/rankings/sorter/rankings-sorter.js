
/**
 *  Called with either trending_upwards or trending_downwards arrays
 *  
 *  The previous rankings filler step consider if it
 * 
 **/
const sortByRankings = (unsortedTtStatsArray) => {

    return unsortedTtStatsArray.sort((ttStatsObjA, ttStatsObjB) => {

        return (ttStatsObjA.trend + ttStatsObjA.dip + ttStatsObjA.volume) <
            (ttStatsObjB.trend + ttStatsObjB.dip + ttStatsObjB.volume) ?
            1 : -1
    })
}

module.exports = {
    sortByRankings
} 