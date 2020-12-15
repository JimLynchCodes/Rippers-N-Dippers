
const twoThingsUpwardsTtStatsUnrankedInput = [
    {
        symbol: 'AFI',
        trend_rate: 5,
        dip_percentage: -0.09,
        volume_ratio: 1.08,
        market_cap_group: 'Micro',
        pe_ratio: -1.29
    },
    {
        symbol: 'Foo',
        trend_rate: 7,
        dip_percentage: -1.09,
        volume_ratio: 5.11,
        market_cap_group: 'Large',
        pe_ratio: 42.2
    }
]

const twoThingsUpwardsTtStatsRankedOut = [{
    symbol: 'AFI',
    trend_rate: 5,
    dip_percentage: -0.09,
    volume_ratio: 1.08,
    market_cap_group: 'Micro',
    pe_ratio: -1.29,
    rankings: { trend: 0, dip: 0, volume: 0 }
},
{
    symbol: 'Foo',
    trend_rate: 7,
    dip_percentage: -1.09,
    volume_ratio: 5.11,
    market_cap_group: 'Large',
    pe_ratio: 42.2,
    rankings: { trend: 1, dip: 1, volume: 1 }

}]

const twoThingsDownwardsTtStatsUnrankedInput = [
    {
        symbol: 'AFI',
        trend_rate: -5.23,
        dip_percentage: 0.09,
        volume_ratio: 2.47,
        market_cap_group: 'Small',
        pe_ratio: 1.29
    },
    {
        symbol: 'Foo',
        trend_rate: -20.23,
        dip_percentage: 4.09,
        volume_ratio: 9.47,
        market_cap_group: 'Large',
        pe_ratio: 5.29
    }
]

const twoThingsDownwardsTtStatsRankedOut = [
    {
        "symbol": "AFI",
        "trend_rate": -5.23,
        "dip_percentage": 0.09,
        "volume_ratio": 2.47,
        "market_cap_group": "Small",
        "pe_ratio": 1.29,
        "rankings": {
            "trend": 0,
            "dip": 0,
            "volume": 0
        }
    },
    {
        "symbol": "Foo",
        "trend_rate": -20.23,
        "dip_percentage": 4.09,
        "volume_ratio": 9.47,
        "market_cap_group": "Large",
        "pe_ratio": 5.29,
        "rankings": {
            "trend": 1,
            "dip": 1,
            "volume": 1
        }
    }
]

module.exports = {
    twoThingsUpwardsTtStatsUnrankedInput,
    twoThingsDownwardsTtStatsUnrankedInput,
    twoThingsDownwardsTtStatsRankedOut,
    twoThingsUpwardsTtStatsRankedOut
}
