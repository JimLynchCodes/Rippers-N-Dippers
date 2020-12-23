
const multiTrenderIexInput = [
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
    },
    {
        companyName: 'Armsfgsdfgstrong Inc',
        marketcap: 34544,
        week52high: 5.345,
        week52low: 1.6,
        week52change: -0.345238095238095244,
        sharesOutstanding: 21626222,
        float: 0,
        avg10Volume: 235626,
        avg30Volume: 56482,
        day200MovingAvg: 3.68,
        day50MovingAvg: 6.29,
        employees: 0,
        ttmEPS: -2.67,
        ttmDividendRate: 0,
        dividendYield: 0,
        nextDividendDate: '',
        exDividendDate: '',
        nextEarningsDate: '',
        peRatio: -1.567178277087035,
        beta: 0.567035280475932,
        maxChangePercent: -0.765733333333333,
        year5ChangePercent: -0.4563333333333,
        year2ChangePercent: -0.456004294917681,
        year1ChangePercent: -0.20456782505910173,
        ytdChangePercent: -0.2145667447306782,
        month6ChangePercent: -0.1456470989761083,
        month3ChangePercent: -0.1456807486631013,
        month1ChangePercent: -0.116664566666667,
        day30ChangePercent: -0.116456616666666667,
        day5ChangePercent: 0.0456049046317,
        symbol: 'FOO'
    }
]

const multiTrenderTtResult = [
    [
        { "dip_percentage": 0.09, "market_cap_group": "Micro", "pe_ratio": -1.29, "symbol": "AFI", "volume_ratio": 1.03, "trend_rate": -5.69 },
        {
            "dip_percentage": 0.05,
            "market_cap_group": "Micro",
            "pe_ratio": -1.57,
            "symbol": "FOO",
            "trend_rate": "N/T",
            "volume_ratio": 4.17,
        },
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
        }
    },
    {
        "cumulative_percentage_changes": {
            "1m": -0.116664566666667,
            "3m": -0.1456807486631013,
            "5d": 0.0456049046317,
        },
        "interval_daily_percentage_changes": {
            "1m-3m": -0.0015642109441903844,
            "3m-6m": 6.25201896042342e-7,
            "5d-1m": -0.00969949730650916,
        },
        "symbol": "FOO",
        "volume_metrics": {
            "10d": 235626,
            "30d": 56482,
        }
    }]
]

module.exports = {
    multiTrenderIexInput,
    multiTrenderTtResult
}
