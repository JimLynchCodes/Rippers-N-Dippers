
// const iexStatsToTtStats = require('./iex-to-tt-calcs').iexStatsToTtStats

// const upTrendNegativeSlopeIexInput = require('./test-cases/up-trend-negative-slope').upTrendNegativeSlopeIexInput
// const upTrendNegativeSlopeTtResult = require('./test-cases/up-trend-negative-slope').upTrendNegativeSlopeTtResult

// const nonTrenderTtIexInput = require('./test-cases/basic-non-trender').nonTrenderIexInput
// const nonTrenderTtResult = require('./test-cases/basic-non-trender').nonTrenderTtResult

// const smallPriceChangesIexInput = require('./test-cases/up-trender-small-nums').smallPriceChangesIexInput
// const smallPriceChangesTtResult = require('./test-cases/up-trender-small-nums').smallPriceChangesTtResult

// const downTrenderIexInput = require('./test-cases/down-trender').downTrenderIexInput
// const downTrenderTtResult = require('./test-cases/down-trender').downTrenderTtResult

// const multiTrenderIexInput = require('./test-cases/multi-trender').multiTrenderIexInput
// const multiTrenderTtResult = require('./test-cases/multi-trender').multiTrenderTtResult

const markOutliers = require('./outlier-marker').markOutliers


describe('marking outliers', () => {

    it('returns an empty array when given an empty array (and no outliers)', () => {

        expect(markOutliers([])).toEqual([[], { trend: [], dip: [], volume: [] }])

    })

    it('should mark outliers "false" when no outliers', () => {

        const mockTtStatsArrayNoOutliers = [
            {
                symbol: 'AAIC',
                trend_rate: 22,
                dip_percentage: -4,
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 11
            },
            {
                symbol: 'GSIT',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10
            },
            {
                symbol: 'GSIT',
                trend_rate: 20,
                dip_percentage: -3,
                volume_ratio: 3,
                market_cap_group: 'Micro',
                pe_ratio: 12
            }
        ]

        const expectedResult = mockTtStatsArrayNoOutliers.map(obj => {
            obj.isOutlier = {
                trend_rate: false,
                dip: false,
                volume: false
            }
            return obj
        })

        expect(markOutliers(mockTtStatsArrayNoOutliers)).toEqual([expectedResult, { trend: [], dip: [], volume: [] }])

    })

    it('should mark low outliers', () => {

        const mockTtStatsArrayLowOutliers = [
            {
                symbol: 'AAIC',
                trend_rate: 22,
                dip_percentage: -4,
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 11
            },
            {
                symbol: 'GSIT',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10
            },
            {
                symbol: 'ABZ',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10
            },
            {
                symbol: 'LOW OUTLIER',
                trend_rate: -200,
                dip_percentage: -97,
                volume_ratio: -90,
                market_cap_group: 'Micro',
                pe_ratio: 12
            }

        ]

        const expectedResult = [
            {
                symbol: 'AAIC',
                trend_rate: 22,
                dip_percentage: -4,
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 11,
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
                isOutlier: {
                    dip: false,
                    trend_rate: false,
                    volume: false,
                }
            },
            {
                symbol: 'ABZ',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10,
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
                isOutlier: {
                    dip: true,
                    trend_rate: true,
                    volume: true,
                }
            },
        ]

        expect(markOutliers(mockTtStatsArrayLowOutliers)).toEqual([expectedResult, { trend: [-200], dip: [-97], volume: [-90] }])

    })

    it('should mark high outliers', () => {

        const mockTtStatsArrayHighOutliers = [
            {
                symbol: 'AAIC',
                trend_rate: 22,
                dip_percentage: -4,
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 11
            },
            {
                symbol: 'GSIT',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10
            },
            {
                symbol: 'ABZ',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10
            },
            {
                symbol: 'HIGH OUTLIER',
                trend_rate: 200,
                dip_percentage: 97,
                volume_ratio: 90,
                market_cap_group: 'Micro',
                pe_ratio: 12
            }

        ]

        const expectedResult = [
            {
                symbol: 'AAIC',
                trend_rate: 22,
                dip_percentage: -4,
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 11,
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
                isOutlier: {
                    dip: false,
                    trend_rate: false,
                    volume: false,
                }
            },
            {
                symbol: 'ABZ',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10,
                isOutlier: {
                    dip: false,
                    trend_rate: false,
                    volume: false,
                }
            },
            {
                symbol: 'HIGH OUTLIER',
                trend_rate: 200,
                dip_percentage: 97,
                volume_ratio: 90,
                market_cap_group: 'Micro',
                pe_ratio: 12,
                isOutlier: {
                    dip: true,
                    trend_rate: true,
                    volume: true,
                }
            },
        ]

        expect(markOutliers(mockTtStatsArrayHighOutliers)).toEqual([expectedResult, { trend: [200], dip: [97], volume: [90] }])

    })

    it('should mark them when there are both high and low outliers', () => {

        const mockTtStatsArrayOutliers = [
            {
                symbol: 'AAIC',
                trend_rate: 22,
                dip_percentage: -4,
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 11
            },
            {
                symbol: 'GSIT',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10
            },
            {
                symbol: 'ABZ',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10
            },
            {
                symbol: 'ABZ2',
                trend_rate: 22,
                dip_percentage: -4,
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 10
            },
            {
                symbol: 'LOW OUTLIER',
                trend_rate: -200,
                dip_percentage: -97,
                volume_ratio: -90,
                market_cap_group: 'Micro',
                pe_ratio: 12,
            },
            {
                symbol: 'HIGH OUTLIER',
                trend_rate: 200,
                dip_percentage: 97,
                volume_ratio: 90,
                market_cap_group: 'Micro',
                pe_ratio: 12
            }

        ]

        const expectedResult = [
            {
                symbol: 'AAIC',
                trend_rate: 22,
                dip_percentage: -4,
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 11,
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
                isOutlier: {
                    dip: false,
                    trend_rate: false,
                    volume: false,
                }
            },
            {
                symbol: 'ABZ',
                trend_rate: 21,
                dip_percentage: -5,
                volume_ratio: 1,
                market_cap_group: 'Micro',
                pe_ratio: 10,
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
                volume_ratio: 2,
                market_cap_group: 'Micro',
                pe_ratio: 10,
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
                isOutlier: {
                    dip: true,
                    trend_rate: true,
                    volume: true,
                }
            },
        ]

        expect(markOutliers(mockTtStatsArrayOutliers)).toEqual([expectedResult, { trend: [-200, 200], dip: [-97, 97], volume: [-90, 90] }])

    })

})

