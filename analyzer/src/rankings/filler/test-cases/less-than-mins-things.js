
const fiveThingsUpwardsTtStatsUnrankedInput = [
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
    },
    {
        symbol: 'Bar',
        trend_rate: 15,
        dip_percentage: -9.09,
        volume_ratio: 8.11,
        market_cap_group: 'Large',
        pe_ratio: 12.2
    }
]

const fiveThingsUpwardsTtStatsRankedOut = [
    [
        {
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
            rankings: { trend: 0.2, dip: 0.11, volume: 0.57 }
        },
        {
            symbol: 'Bar',
            trend_rate: 15,
            dip_percentage: -9.09,
            volume_ratio: 8.11,
            market_cap_group: 'Large',
            pe_ratio: 12.2,
            rankings: { trend: 1, dip: 1, volume: 1 }
        }],

    {
        "dip": {
            "max": -0.09,
            "min": -9.09,
        },
        "trend": {
            "max": 15,
            "min": 5,
        },
        "volume": {
            "max": 8.11,
            "min": 1.08,
        }
    }
]

const fiveThingsDownwardsTtStatsUnrankedInput = [
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
    },
    {
        symbol: 'CHEESE',
        trend_rate: -40.23,
        dip_percentage: 6.09,
        volume_ratio: 13.47,
        market_cap_group: 'Mid',
        pe_ratio: 15.29
    }
]

const fiveThingsDownwardsTtStatsRankedOut = [
    [
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
                "trend": 0.43,
                "dip": 0.67,
                "volume": 0.64
            }
        },
        {
            "symbol": "CHEESE",
            "trend_rate": -40.23,
            "dip_percentage": 6.09,
            "volume_ratio": 13.47,
            "market_cap_group": "Mid",
            "pe_ratio": 15.29,
            "rankings": {
                "trend": 1,
                "dip": 1,
                "volume": 1
            }
        }
    ],
    {
        "dip": {
            "max": 6.09,
            "min": 0.09,
        },
        "trend": {
            "max": -5.23,
            "min": -40.23,
        },
        "volume": {
            "max": 13.47,
            "min": 2.47,
        }
    }
]

module.exports = {
    fiveThingsUpwardsTtStatsUnrankedInput,
    fiveThingsDownwardsTtStatsUnrankedInput,
    fiveThingsDownwardsTtStatsRankedOut,
    fiveThingsUpwardsTtStatsRankedOut
}
