
const downTrenderIexInput = [
    {
        companyName: 'Armstrong Flooring Inc',
        marketcap: 72447844,
        week52high: 5.26,
        week52low: 1.3,
        week52change: -0.20238095238095244,
        sharesOutstanding: 21626222,
        float: 0,
        avg10Volume: 239726,
        avg30Volume: 232482,
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
        ytdChangePercent: -0.21545667447306782,
        month6ChangePercent: -0.14334470989761083,
        month3ChangePercent: -0.12427807486631013,
        month1ChangePercent: -0.1166666666666667,
        day30ChangePercent: -0.1166666666666667,
        day5ChangePercent: 0.08719346049046317,
        symbol: 'AFI'
    }
]

const downTrenderTtResult = [
    [
        { "dip_percentage": 0.09, "market_cap_group": "Micro", "pe_ratio": -1.29, "symbol": "AFI", "volume_ratio": 1.03, "trend_rate": -5.69 }
    ],
    [{
        "cumulative_percentage_changes": {
            "1m": -0.1166666666666667,
            "3m": -0.12427807486631012,
            "5d": 0.08719346049046317,
        },
        "interval_daily_percentage_changes": {
            "1m-3m": -0.0004103185013284861,
            "3m-6m": -0.00034559486500310377,
            "5d-1m": -0.01171940267335004,
        },
        "symbol": "AFI",
        "volume_metrics": {
            "10d": 239726,
            "30d": 232482,
        },
    }]
]

module.exports = {
    downTrenderIexInput,
    downTrenderTtResult
}
