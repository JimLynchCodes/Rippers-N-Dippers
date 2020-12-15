
const threeThingsTtStatsUnsorted = [
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
        symbol: 'AFI',
        trend_rate: 5,
        dip_percentage: -0.09,
        volume_ratio: 1.08,
        market_cap_group: 'Micro',
        pe_ratio: -1.29,
        rankings: { trend: 0, dip: 0, volume: 0 }
    },
    {
        symbol: 'Bar',
        trend_rate: 15,
        dip_percentage: -9.09,
        volume_ratio: 8.11,
        market_cap_group: 'Large',
        pe_ratio: 12.2,
        rankings: { trend: 1, dip: 1, volume: 1 }
    }
]

const sortedThreeThingsThingsTtStats = [
    threeThingsTtStatsUnsorted[2],
    threeThingsTtStatsUnsorted[0],
    threeThingsTtStatsUnsorted[1]
]

module.exports = {
    threeThingsTtStatsUnsorted,
    sortedThreeThingsThingsTtStats
}
