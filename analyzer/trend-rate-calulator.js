
const regression = require('regression')

/**
 *   
 *    Trend Intervals & Dip Interval Diagram
 * 
 *           Ti1
 *         /    \        Ti2
 *       /        \     /   \    Ti3
 *     /            \ /       \ /  \  Di
 *    |----|----|----|----|----|----|----|
 *    6m             3m        1m   5d   today
 * 
 */

calculateTrendIntervals = (day5ChangePercent, month1ChangePercent, month3ChangePercent, month6ChangePercent) => {

    /**
     *  "ti[n]" stands for "the daily avg percent change over the trend interval n." 
     */
    const marketDaysInTi1 = 63
    const marketDaysInTi2 = 21
    const marketDaysInTi3 = 16

    // x * (1 + day5ChangePercent) * (1 + ti3) = x * (1 + month1ChangePercent)
    const ti3 = ((1 + month1ChangePercent) / (1 + day5ChangePercent)) - 1
    console.log('ti3 ', ti3)
    
    const ti3_daily_avg = ti3 / marketDaysInTi3
    console.log('ti3_daily_avg ', ti3_daily_avg)
    
    // x * (1 + month1ChangePercent) * (1 + ti2) = x * (1 + month3ChangePercent)
    const ti2 = ((1 + month3ChangePercent) / (1 + month1ChangePercent)) - 1
    console.log('ti2 ', ti2)
    
    const ti2_daily_avg = ti2 / marketDaysInTi2
    console.log('ti2_daily_avg ', ti2_daily_avg)
    
    // x * (1 + month3ChangePercent) * (1 + ti1) = x * (1 + month6ChangePercent)
    const ti1 = ((1 + month6ChangePercent) / (1 + month3ChangePercent)) - 1
    console.log('ti1 ', ti1)
    
    const ti1_daily_avg = ti1 / marketDaysInTi1
    console.log('ti1_daily_avg ', ti1_daily_avg)

    return [ti1_daily_avg, ti2_daily_avg, ti3_daily_avg]

    return [1, 5, 47]
}

const calculateTrendRate = (day5ChangePercent, month1ChangePercent, month3ChangePercent, month6ChangePercent) => {

    const [ti1, ti2, ti3] = calculateTrendIntervals(day5ChangePercent, month1ChangePercent, month3ChangePercent, month6ChangePercent)

    if ((ti1 < 0 && ti2 < 0 && ti3 < 0) || 
        (ti1 > 0 && ti2 > 0 && ti3 > 0)) {
            const equation = regression.linear([[1, ti1], [2, ti2], [3, ti3]]).equation
        
            const slope = equation[0]
        
            const niceSlope = +slope.toFixed(2)
        
            return niceSlope
    }
    else {
        return 'N/T'
    }

}

module.exports = {
    calculateTrendRate
}