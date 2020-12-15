
const singleThingUpwardsTtStatsUnrankedInput = [
    {
        symbol: 'AFI',
        trend_rate: 5,
        dip_percentage: -0.09,
        volume_ratio: 1.08,
        market_cap_group: 'Micro',
        pe_ratio: -1.29
    }
]

const singleThingUpwardsTtStatsRankedOut = [{
    symbol: 'AFI',
    trend_rate: 5,
    dip_percentage: -0.09,
    volume_ratio: 1.08,
    market_cap_group: 'Micro',
    pe_ratio: -1.29,
    rankings: { trend: 1, dip: 1, volume: 1 }
}]

const singleThingDownwardsTtStatsUnrankedInput = [
    {
        symbol: 'AFI',
        trend_rate: -5.23,
        dip_percentage: 0.09,
        volume_ratio: 2.47,
        market_cap_group: 'Small',
        pe_ratio: 1.29
    }
]

const singleThingDownwardsTtStatsRankedOut = [
    {
        "symbol": "AFI",
        "trend_rate": -5.23,
        "dip_percentage": 0.09,
        "volume_ratio": 2.47,
        "market_cap_group": "Small",
        "pe_ratio": 1.29,
        "rankings": {
            "trend": 1,
            "dip": 1,
            "volume": 1
        }
    }
]

module.exports = {
    singleThingUpwardsTtStatsUnrankedInput,
    singleThingDownwardsTtStatsUnrankedInput,
    singleThingDownwardsTtStatsRankedOut,
    singleThingUpwardsTtStatsRankedOut
}
