
const outliers = require('outliers')

const markOutliers = (ttStatsArr, i) => {

    const trendRateValues = []
    const dipValues = []
    const volumeValues = []
    
    ttStatsArr.forEach( (ttStatsObj, index) => {
        trendRateValues.push(ttStatsObj.trend_rate)
        dipValues.push(ttStatsObj.dip_percentage)
        volumeValues.push(ttStatsObj.volume_ratio)
    })
    
    const trendRateOutliers = outliers(trendRateValues)
    const dipOutliers = outliers(dipValues)
    const volumeOutliers = outliers(volumeValues)

    const outlierValues = {
        trend: trendRateOutliers,
        dip: dipOutliers,
        volume: volumeOutliers,
    }

    const ttStatsWithMarkedOutliers = ttStatsArr.map(ttStatsObj => {

        ttStatsObj.isOutlier = {
            trend_rate: trendRateOutliers.includes(ttStatsObj.trend_rate),
            dip: dipOutliers.includes(ttStatsObj.dip_percentage),
            volume: volumeOutliers.includes(ttStatsObj.volume_ratio)
        }

        return ttStatsObj
    })

    return [ttStatsWithMarkedOutliers, outlierValues]
}

module.exports = {
    markOutliers
}