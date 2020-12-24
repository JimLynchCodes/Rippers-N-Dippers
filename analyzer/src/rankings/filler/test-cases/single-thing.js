
const singleThingUpwardsTtStatsUnrankedInput = [
    {
        symbol: 'AFI',
        trend_rate: 5,
        dip_percentage: -0.09,
        volume_ratio: 1.08,
        market_cap_group: 'Micro',
        isOutlier: { dip: false, trend_rate: false, volume: false },
        pe_ratio: -1.29
    }
]

// one thing, so min and max are same as what's passed in
const singleThingUpwardsTtStatsRankedOut = [[{
    symbol: 'AFI',
    trend_rate: 5,
    dip_percentage: -0.09,
    volume_ratio: 1.08,
    market_cap_group: 'Micro',
    pe_ratio: -1.29,
    isOutlier: { dip: false, trend_rate: false, volume: false },
    rankings: { trend: 1, dip: 1, volume: 1 }
}],
{
    "dip": {
        "max": -0.09,
        "min": -0.09,
    },
    "trend": {
        "max": 5,
        "min": 5,
    },
    "volume": {
        "max": 1.08,
        "min": 1.08,
    }
}]

const singleThingDownwardsTtStatsUnrankedInput = [
    {
        symbol: 'AFI',
        trend_rate: -5.23,
        dip_percentage: 0.09,
        volume_ratio: 0.78,
        market_cap_group: 'Small',
        isOutlier: { dip: false, trend_rate: false, volume: false },
        pe_ratio: 1.29
    }
]

const singleThingDownwardsTtStatsRankedOut = [
    [{
        "symbol": "AFI",
        "trend_rate": -5.23,
        "dip_percentage": 0.09,
        "volume_ratio": 0.78,
        "market_cap_group": "Small",
        "pe_ratio": 1.29,
        isOutlier: { dip: false, trend_rate: false, volume: false },
        "rankings": {
            "trend": 1,
            "dip": 1,
            "volume": 1
        }
    }],
    {
        "dip": {
            "max": 0.09,
            "min": 0.09,
        },
        "trend": {
            "max": -5.23,
            "min": -5.23,
        },
        "volume": {
            "max": 0.78,
            "min": 0.78,
        }
    }
]

module.exports = {
    singleThingUpwardsTtStatsUnrankedInput,
    singleThingDownwardsTtStatsUnrankedInput,
    singleThingDownwardsTtStatsRankedOut,
    singleThingUpwardsTtStatsRankedOut
}
