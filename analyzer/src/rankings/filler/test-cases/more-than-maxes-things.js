
//  it('should mark them when there are both high and low outliers', () => {

//     const mockTtStatsArrayOutliers = [
//         {
//             symbol: 'AAIC',
//             trend_rate: 22,
//             dip_percentage: -4,
//             volume_ratio: 2,
//             market_cap_group: 'Micro',
//             pe_ratio: 11
//         },
//         {
//             symbol: 'GSIT',
//             trend_rate: 21,
//             dip_percentage: -5,
//             volume_ratio: 1,
//             market_cap_group: 'Micro',
//             pe_ratio: 10
//         },
//         {
//             symbol: 'ABZ',
//             trend_rate: 21,
//             dip_percentage: -5,
//             volume_ratio: 1,
//             market_cap_group: 'Micro',
//             pe_ratio: 10
//         },
//         {
//             symbol: 'ABZ2',
//             trend_rate: 22,
//             dip_percentage: -4,
//             volume_ratio: 2,
//             market_cap_group: 'Micro',
//             pe_ratio: 10
//         },
//         {
//             symbol: 'LOW OUTLIER',
//             trend_rate: -200,
//             dip_percentage: -97,
//             volume_ratio: -90,
//             market_cap_group: 'Micro',
//             pe_ratio: 12,
//         },
//         {
//             symbol: 'HIGH OUTLIER',
//             trend_rate: 200,
//             dip_percentage: 97,
//             volume_ratio: 90,
//             market_cap_group: 'Micro',
//             pe_ratio: 12
//         }
//     ]

//     const expectedResult = [
//         {
//             symbol: 'AAIC',
//             trend_rate: 22,
//             dip_percentage: -4,
//             volume_ratio: 2,
//             market_cap_group: 'Micro',
//             pe_ratio: 11,
//             isOutlier: {
//                 dip: false,
//                 trend_rate: false,
//                 volume: false,
//             }
//         },
//         {
//             symbol: 'GSIT',
//             trend_rate: 21,
//             dip_percentage: -5,
//             volume_ratio: 1,
//             market_cap_group: 'Micro',
//             pe_ratio: 10,
//             isOutlier: {
//                 dip: false,
//                 trend_rate: false,
//                 volume: false,
//             }
//         },
//         {
//             symbol: 'ABZ',
//             trend_rate: 21,
//             dip_percentage: -5,
//             volume_ratio: 1,
//             market_cap_group: 'Micro',
//             pe_ratio: 10,
//             isOutlier: {
//                 dip: false,
//                 trend_rate: false,
//                 volume: false,
//             }
//         },
//         {
//             symbol: 'ABZ2',
//             trend_rate: 22,
//             dip_percentage: -4,
//             volume_ratio: 2,
//             market_cap_group: 'Micro',
//             pe_ratio: 10,
//             isOutlier: {
//                 dip: false,
//                 trend_rate: false,
//                 volume: false,
//             }
//         },
//         {
//             symbol: 'LOW OUTLIER',
//             trend_rate: -200,
//             dip_percentage: -97,
//             volume_ratio: -90,
//             market_cap_group: 'Micro',
//             pe_ratio: 12,
//             isOutlier: {
//                 dip: true,
//                 trend_rate: true,
//                 volume: true,
//             }
//         },
//         {
//             symbol: 'HIGH OUTLIER',
//             trend_rate: 200,
//             dip_percentage: 97,
//             volume_ratio: 90,
//             market_cap_group: 'Micro',
//             pe_ratio: 12,
//             isOutlier: {
//                 dip: true,
//                 trend_rate: true,
//                 volume: true,
//             }
//         },
//     ]

//     expect(markOutliers(mockTtStatsArrayOutliers)).toEqual([expectedResult, { trend: [-200, 200], dip: [-97, 97], volume: [-90, 90] }])

// })


const overTheBoundariesMaxesAndMinsUnrankedInput = [
    {
        symbol: 'AAIC',
        trend_rate: 34.4,
        dip_percentage: -4,
        volume_ratio: 2,
        market_cap_group: 'Micro',
        pe_ratio: 11,
        isOutlier: { trend_rate: false, dip: false, volume: false }
    },
    {
        symbol: 'GSIT',
        trend_rate: 21,
        dip_percentage: -5,
        volume_ratio: 1,
        market_cap_group: 'Micro',
        pe_ratio: 10,
        isOutlier: { trend_rate: false, dip: false, volume: false }
    },
    {
        symbol: 'ABZ',
        trend_rate: 21,
        dip_percentage: -2,
        volume_ratio: 1.4,
        market_cap_group: 'Micro',
        pe_ratio: 10,
        isOutlier: { trend_rate: false, dip: false, volume: false }
    },
    {
        symbol: 'ABZ2',
        trend_rate: 22,
        dip_percentage: -4,
        volume_ratio: 2.13,
        market_cap_group: 'Micro',
        pe_ratio: 10,
        isOutlier: { trend_rate: false, dip: false, volume: false }
    },
    {
        symbol: 'LOW OUTLIER',
        trend_rate: -200,
        dip_percentage: -97,
        volume_ratio: -90,
        market_cap_group: 'Micro',
        pe_ratio: 12,
        isOutlier: { trend_rate: true, dip: true, volume: true }
    },
    {
        symbol: 'HIGH OUTLIER',
        trend_rate: 200,
        dip_percentage: 97,
        volume_ratio: 90,
        market_cap_group: 'Micro',
        pe_ratio: 12,
        isOutlier: { trend_rate: true, dip: true, volume: true }
    }
]





// [
//     {
//         symbol: 'Foo1',
//         trend_rate: 5,
//         dip_percentage: -0.09,
//         volume_ratio: 1.08,
//         market_cap_group: 'Micro',
//         pe_ratio: -1.29,
//         isOutlier: { trend_rate: false, dip: false, volume: false }
//     },
//     {
//         symbol: 'Foo2',
//         trend_rate: 7,
//         dip_percentage: -1.09,
//         volume_ratio: 5.11,
//         market_cap_group: 'Large',
//         pe_ratio: 42.2,
//         isOutlier: { trend_rate: false, dip: false, volume: false }
//     },
//     {
//         symbol: 'Foo3',
//         trend_rate: 15,
//         dip_percentage: -9.09,
//         volume_ratio: 8.11,
//         market_cap_group: 'Large',
//         pe_ratio: 12.2,
//         isOutlier: { trend_rate: false, dip: false, volume: false }
//     },
//     {
//         symbol: 'Foo4',
//         trend_rate: 57,
//         dip_percentage: -10.09,
//         volume_ratio: 8.11,
//         market_cap_group: 'Large',
//         pe_ratio: 12.2,
//         isOutlier: { trend_rate: false, dip: false, volume: false }
//     },
//     {
//         symbol: 'Foo5',
//         trend_rate: 2,
//         dip_percentage: -5.09,
//         volume_ratio: 8.11,
//         market_cap_group: 'Large',
//         pe_ratio: 12.2,
//         isOutlier: { trend_rate: false, dip: false, volume: false }
//     }
// ]

const overTheBoundariesMaxesAndMinsTtStatsRankedForUpwards = [
    [
        {
            symbol: 'AAIC',
            trend_rate: 34.4,
            dip_percentage: -4,
            volume_ratio: 2,
            market_cap_group: 'Micro',
            pe_ratio: 11,
            rankings: { trend: 1, dip: 0.67, volume: 0.88 },
            isOutlier: {
                dip: false,
                trend_rate: false,
                volume: false,
            }
        },
        {
            symbol: 'GSIT',
            trend_rate: 21,
            dip_percentage: -5,
            volume_ratio: 1,
            market_cap_group: 'Micro',
            pe_ratio: 10,
            rankings: { trend: 0, dip: 1, volume: 0 },
            isOutlier: {
                dip: false,
                trend_rate: false,
                volume: false,
            }
        },
        {
            symbol: 'ABZ',
            trend_rate: 21,
            dip_percentage: -2,
            volume_ratio: 1.4,
            market_cap_group: 'Micro',
            pe_ratio: 10,
            rankings: { trend: 0, dip: 0, volume: 0.35 },
            isOutlier: {
                dip: false,
                trend_rate: false,
                volume: false,
            }
        },
        {
            symbol: 'ABZ2',
            trend_rate: 22,
            dip_percentage: -4,
            volume_ratio: 2.13,
            market_cap_group: 'Micro',
            pe_ratio: 10,
            rankings: { trend: 0.07, dip: 0.67, volume: 1 },
            isOutlier: {
                dip: false,
                trend_rate: false,
                volume: false,
            }
        },
        {
            symbol: 'LOW OUTLIER',
            trend_rate: -200,
            dip_percentage: -97,
            volume_ratio: -90,
            market_cap_group: 'Micro',
            pe_ratio: 12,
            rankings: { trend: 0, dip: 1, volume: 0 },
            isOutlier: {
                dip: true,
                trend_rate: true,
                volume: true,
            }
        },
        {
            symbol: 'HIGH OUTLIER',
            trend_rate: 200,
            dip_percentage: 97,
            volume_ratio: 90,
            market_cap_group: 'Micro',
            pe_ratio: 12,
            rankings: { trend: 1, dip: 0, volume: 1 },
            isOutlier: {
                dip: true,
                trend_rate: true,
                volume: true,
            }
        }],
    {
        "dip": {
            "max": -2,
            "min": -5
        },
        "trend": {
            "max": 34.4,
            "min": 21
        },
        "volume": {
            "max": 2.13,
            "min": 1
        }
    }
]


const overTheBoundariesMaxesAndMinsTtStatsRankedForDownwards = [
    [
        {
            symbol: 'AAIC',
            trend_rate: 34.4,
            dip_percentage: -4,
            volume_ratio: 2,
            market_cap_group: 'Micro',
            pe_ratio: 11,
            rankings: { trend: 0, dip: 0.33, volume: 0.88 },
            isOutlier: {
                dip: false,
                trend_rate: false,
                volume: false,
            }
        },
        {
            symbol: 'GSIT',
            trend_rate: 21,
            dip_percentage: -5,
            volume_ratio: 1,
            market_cap_group: 'Micro',
            pe_ratio: 10,
            rankings: { trend: 1, dip: 0, volume: 0 },
            isOutlier: {
                dip: false,
                trend_rate: false,
                volume: false,
            }
        },
        {
            symbol: 'ABZ',
            trend_rate: 21,
            dip_percentage: -2,
            volume_ratio: 1.4,
            market_cap_group: 'Micro',
            pe_ratio: 10,
            rankings: { trend: 1, dip: 1, volume: 0.35 },
            isOutlier: {
                dip: false,
                trend_rate: false,
                volume: false,
            }
        },
        {
            symbol: 'ABZ2',
            trend_rate: 22,
            dip_percentage: -4,
            volume_ratio: 2.13,
            market_cap_group: 'Micro',
            pe_ratio: 10,
            rankings: { trend: 0.93, dip: 0.33, volume: 1 },
            isOutlier: {
                dip: false,
                trend_rate: false,
                volume: false,
            }
        },
        {
            symbol: 'LOW OUTLIER',
            trend_rate: -200,
            dip_percentage: -97,
            volume_ratio: -90,
            market_cap_group: 'Micro',
            pe_ratio: 12,
            rankings: { trend: 1, dip: 0, volume: 0 },
            isOutlier: {
                dip: true,
                trend_rate: true,
                volume: true,
            }
        },
        {
            symbol: 'HIGH OUTLIER',
            trend_rate: 200,
            dip_percentage: 97,
            volume_ratio: 90,
            market_cap_group: 'Micro',
            pe_ratio: 12,
            rankings: { trend: 0, dip: 1, volume: 1 },
            isOutlier: {
                dip: true,
                trend_rate: true,
                volume: true,
            }
        }],
    {
        "dip": {
            "max": -2,
            "min": -5
        },
        "trend": {
            "max": 34.4,
            "min": 21
        },
        "volume": {
            "max": 2.13,
            "min": 1
        }
    }
]

module.exports = {
    overTheBoundariesMaxesAndMinsUnrankedInput,
    overTheBoundariesMaxesAndMinsTtStatsRankedForDownwards,
    overTheBoundariesMaxesAndMinsTtStatsRankedForUpwards
}
