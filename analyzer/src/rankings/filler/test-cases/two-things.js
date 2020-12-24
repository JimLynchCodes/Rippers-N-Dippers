
const twoThingsUpwardsTtStatsUnrankedInput = [
    {
        symbol: 'AFI',
        trend_rate: 5,
        dip_percentage: -0.09,
        volume_ratio: 1.08,
        market_cap_group: 'Micro',
        isOutlier: { dip: false, trend_rate: false, volume: false },
        pe_ratio: -1.29
    },
    {
        symbol: 'Foo',
        trend_rate: 7,
        dip_percentage: -1.09,
        volume_ratio: 5.11,
        market_cap_group: 'Large',
        isOutlier: { dip: false, trend_rate: false, volume: false },
        pe_ratio: 42.2
    }
]

const twoThingsUpwardsTtStatsRankedOut = [
    [
        {
            symbol: 'AFI',
            trend_rate: 5,
            dip_percentage: -0.09,
            volume_ratio: 1.08,
            market_cap_group: 'Micro',
            pe_ratio: -1.29,
            isOutlier: { dip: false, trend_rate: false, volume: false },
            rankings: { trend: 0, dip: 0, volume: 0 }
        },
        {
            symbol: 'Foo',
            trend_rate: 7,
            dip_percentage: -1.09,
            volume_ratio: 5.11,
            market_cap_group: 'Large',
            pe_ratio: 42.2,
            isOutlier: { dip: false, trend_rate: false, volume: false },
            rankings: { trend: 1, dip: 1, volume: 1 }

        }
    ],
    {
        "dip": {
            "max": -0.09,
            "min": -1.09,
        },
        "trend": {
            "max": 7,
            "min": 5,
        },
        "volume": {
            "max": 5.11,
            "min": 1.08,
        }
    }
]

const twoThingsDownwardsTtStatsUnrankedInput = [
    {
        symbol: 'AFI',
        trend_rate: -5.23,
        dip_percentage: 0.09,
        volume_ratio: 2.47,
        market_cap_group: 'Small',
        isOutlier: { dip: false, trend_rate: false, volume: false },
        pe_ratio: 1.29
    },
    {
        symbol: 'Foo',
        trend_rate: -20.23,
        dip_percentage: 4.09,
        volume_ratio: 9.47,
        market_cap_group: 'Large',
        isOutlier: { dip: false, trend_rate: false, volume: false },
        pe_ratio: 5.29
    }
]

const twoThingsDownwardsTtStatsRankedOut = [
    [
        {
            "symbol": "AFI",
            "trend_rate": -5.23,
            "dip_percentage": 0.09,
            "volume_ratio": 2.47,
            "market_cap_group": "Small",
            "pe_ratio": 1.29,
            isOutlier: { dip: false, trend_rate: false, volume: false },
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
            isOutlier: { dip: false, trend_rate: false, volume: false },
            "rankings": {
                "trend": 1,
                "dip": 1,
                "volume": 1
            }
        }
    ],
    {
        "dip": {
            "max": 4.09,
            "min": 0.09,
        },
        "trend": {
            "max": -5.23,
            "min": -20.23,
        },
        "volume": {
            "max": 9.47,
            "min": 2.47,
        }
    }
]

module.exports = {
    twoThingsUpwardsTtStatsUnrankedInput,
    twoThingsDownwardsTtStatsUnrankedInput,
    twoThingsDownwardsTtStatsRankedOut,
    twoThingsUpwardsTtStatsRankedOut
}
