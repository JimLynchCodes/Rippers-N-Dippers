
const iexStatsToTtStats = require('./iex-to-tt-calcs').iexStatsToTtStats

const upTrendNegativeSlopeIexInput = require('./test-cases/up-trend-negative-slope').upTrendNegativeSlopeIexInput
const upTrendNegativeSlopeTtResult = require('./test-cases/up-trend-negative-slope').upTrendNegativeSlopeTtResult

const nonTrenderTtIexInput = require('./test-cases/basic-non-trender').nonTrenderIexInput
const nonTrenderTtResult = require('./test-cases/basic-non-trender').nonTrenderTtResult

const smallPriceChangesIexInput = require('./test-cases/up-trender-small-nums').smallPriceChangesIexInput
const smallPriceChangesTtResult = require('./test-cases/up-trender-small-nums').smallPriceChangesTtResult

const downTrenderIexInput = require('./test-cases/down-trender').downTrenderIexInput
const downTrenderTtResult = require('./test-cases/down-trender').downTrenderTtResult

const multiTrenderIexInput = require('./test-cases/multi-trender').multiTrenderIexInput
const multiTrenderTtResult = require('./test-cases/multi-trender').multiTrenderTtResult


describe('converting iex stats to tt stats', () => {

    it.each([
        ['small nums up-trender', smallPriceChangesIexInput, smallPriceChangesTtResult],
        // ['non-trender`', nonTrenderTtIexInput, nonTrenderTtResult],
        // ['up-trender negative slope', upTrendNegativeSlopeIexInput, upTrendNegativeSlopeTtResult],
        ['down-trende`r', downTrenderIexInput, downTrenderTtResult],
        ['multi-trender', multiTrenderIexInput, multiTrenderTtResult],
    ])('%s', (_message, input, expectedResult) => {

        const actual = iexStatsToTtStats(input)

        console.log('got actual: ', actual)

        expect(actual).toEqual(expectedResult)

    })

})