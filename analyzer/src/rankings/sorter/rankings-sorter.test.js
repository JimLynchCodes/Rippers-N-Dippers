
const sortByRankings = require('./rankings-sorter').sortByRankings

const threeThingsTtStatsUnsorted = require('./test-cases/three-things').threeThingsTtStatsUnsorted
const sortedThreeThingsThingsTtStats = require('./test-cases/three-things').sortedThreeThingsThingsTtStats

const tenThingsTtStatsUnsorted = require('./test-cases/ten-things').tenThingsTtStatsUnsorted
const sortedTenThingsThingsTtStats = require('./test-cases/ten-things').sortedTenThingsThingsTtStats


describe('sorting by rankings', () => {

    it.each([

        ['sorts three things by overall rankings sum', threeThingsTtStatsUnsorted, sortedThreeThingsThingsTtStats],
        ['sorts ten things by overall rankings sum', tenThingsTtStatsUnsorted, sortedTenThingsThingsTtStats],

    ])('%s', (_message, input, expectedResult) => {

        expect(sortByRankings(input)).toEqual(expectedResult)

    })

})