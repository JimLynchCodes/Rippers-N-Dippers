
const upTrendNegativeSlopeIexInput = {
    AFI: {
        stats: {
            companyName: 'Armstrong Flooring Inc',
            marketcap: 72447844,
            week52high: 5.26,
            week52low: 1.3,
            week52change: -0.20238095238095244,
            sharesOutstanding: 21626222,
            float: 0,
            avg10Volume: 4,
            avg30Volume: 2,
            day200MovingAvg: 3.48,
            day50MovingAvg: 3.29,
            employees: 0,
            ttmEPS: -2.57,
            ttmDividendRate: 0,
            dividendYield: 0,
            nextDividendDate: '',
            exDividendDate: '',
            nextEarningsDate: '',
            peRatio: -1.2868178277087035,
            beta: 0.8576035280475932,
            maxChangePercent: -0.7208333333333333,
            year5ChangePercent: -0.7208333333333333,
            year2ChangePercent: -0.7602004294917681,
            year1ChangePercent: -0.20803782505910173,
            ytdChangePercent: 0.05,
            month6ChangePercent: 7.99,
            month3ChangePercent: 1.79,
            month1ChangePercent: 0.2,
            day30ChangePercent: 0.2,
            day5ChangePercent: 0.001
        }
    }
}

const upTrendNegativeSlopeTtResult = [{ "dip_percentage": 0, "market_cap_group": "Micro", "pe_ratio": -1.29, "symbol": "AFI", "volume_ratio": 2, "trend_rate": -11.42 }]

module.exports = {
    upTrendNegativeSlopeIexInput,
    upTrendNegativeSlopeTtResult
}
