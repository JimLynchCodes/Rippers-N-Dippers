
const fiveThingsUpwardsTtStatsUnrankedInput = [
    {
        symbol: 'Foo1',
        trend_rate: 5,
        dip_percentage: -0.09,
        volume_ratio: 1.08,
        market_cap_group: 'Micro',
        pe_ratio: -1.29
    },
    {
        symbol: 'Foo2',
        trend_rate: 7,
        dip_percentage: -1.09,
        volume_ratio: 5.11,
        market_cap_group: 'Large',
        pe_ratio: 42.2
    },
    {
        symbol: 'Foo3',
        trend_rate: 15,
        dip_percentage: -9.09,
        volume_ratio: 8.11,
        market_cap_group: 'Large',
        pe_ratio: 12.2
    },
    {
        symbol: 'Foo4',
        trend_rate: 16,
        dip_percentage: -10.09,
        volume_ratio: 8.11,
        market_cap_group: 'Large',
        pe_ratio: 12.2
    },
    {
        symbol: 'Foo5',
        trend_rate: 2,
        dip_percentage: -5.09,
        volume_ratio: 8.11,
        market_cap_group: 'Large',
        pe_ratio: 12.2
    }
    // {
    //     symbol: 'Foo4',
    //     trend_rate: 3.32,
    //     dip_percentage: -9.09,
    //     volume_ratio: 8.11,
    //     market_cap_group: 'Large',
    //     pe_ratio: 12.2
    // },
    // {
    //     symbol: 'Foo5',
    //     trend_rate: 2.3,
    //     dip_percentage: -9.09,
    //     volume_ratio: 8.11,
    //     market_cap_group: 'Large',
    //     pe_ratio: 12.2
    // },
]

const fiveThingsUpwardsTtStatsRankedOut = [[
    {
        symbol: 'Foo1',
        trend_rate: 5,
        dip_percentage: -0.09,
        volume_ratio: 1.08,
        market_cap_group: 'Micro',
        pe_ratio: -1.29,
        rankings: { trend: 0.79, dip: 1, volume: 0 }
    },
    {
        symbol: 'Foo2',
        trend_rate: 7,
        dip_percentage: -1.09,
        volume_ratio: 5.11,
        market_cap_group: 'Large',
        pe_ratio: 42.2,
        rankings: { trend: 0.64, dip: 0.9, volume: 0.57 }
    },
    {
        symbol: 'Foo3',
        trend_rate: 15,
        dip_percentage: -9.09,
        volume_ratio: 8.11,
        market_cap_group: 'Large',
        pe_ratio: 12.2,
        rankings: { trend: 0.07, dip: 0.1, volume: 1 }
    },
    {
        symbol: 'Foo4',
        trend_rate: 16,
        dip_percentage: -10.09,
        volume_ratio: 8.11,
        market_cap_group: 'Large',
        pe_ratio: 12.2,
        rankings: { trend: 0, dip: 0, volume: 1 }
    },
    {
        symbol: 'Foo5',
        trend_rate: 2,
        dip_percentage: -5.09,
        volume_ratio: 8.11,
        market_cap_group: 'Large',
        pe_ratio: 12.2,
        rankings: { trend: 1, dip: 1, volume: 1 }
    }
],
{
    "dip": {
        "max": -0.09,
        "min": -10.09
    },
    "trend": {
        "max": 16,
        "min": 2
    },
    "volume": {
        "max": 8.11,
        "min": 1.08
    }
}
]

module.exports = {
    fiveThingsUpwardsTtStatsUnrankedInput,
    // fiveThingsDownwardsTtStatsUnrankedInput,
    // fiveThingsDownwardsTtStatsRankedOut,
    fiveThingsUpwardsTtStatsRankedOut
}
