
const fillInRankings = require('./rankings-filler').fillInRankings

const singleThingUpwardsTtStatsUnrankedInput = require('./test-cases/single-thing').singleThingUpwardsTtStatsUnrankedInput
const singleThingDownwardsTtStatsUnrankedInput = require('./test-cases/single-thing').singleThingDownwardsTtStatsUnrankedInput
const singleThingUpwardsTtStatsRankedOut = require('./test-cases/single-thing').singleThingUpwardsTtStatsRankedOut
const singleThingDownwardsTtStatsRankedOut = require('./test-cases/single-thing').singleThingDownwardsTtStatsRankedOut

const twoThingsUpwardsTtStatsUnrankedInput = require('./test-cases/two-things').twoThingsUpwardsTtStatsUnrankedInput
const twoThingsDownwardsTtStatsUnrankedInput = require('./test-cases/two-things').twoThingsDownwardsTtStatsUnrankedInput
const twoThingsUpwardsTtStatsRankedOut = require('./test-cases/two-things').twoThingsUpwardsTtStatsRankedOut
const twoThingsDownwardsTtStatsRankedOut = require('./test-cases/two-things').twoThingsDownwardsTtStatsRankedOut

const threeThingsUpwardsTtStatsUnrankedInput = require('./test-cases/three-things').threeThingsUpwardsTtStatsUnrankedInput
const threeThingsDownwardsTtStatsUnrankedInput = require('./test-cases/three-things').threeThingsDownwardsTtStatsUnrankedInput
const threeThingsUpwardsTtStatsRankedOut = require('./test-cases/three-things').threeThingsUpwardsTtStatsRankedOut
const threeThingsDownwardsTtStatsRankedOut = require('./test-cases/three-things').threeThingsDownwardsTtStatsRankedOut

const nonTrendersTtStatsUnrankedInput = require('./test-cases/non-trender').nonTrendersTtStatsUnrankedInput

describe('filling in rankings', () => {

    it.each([
        
        ['single thing upwards', 'upwards', singleThingUpwardsTtStatsUnrankedInput, singleThingUpwardsTtStatsRankedOut],
        ['single thing downwards', 'downwards', singleThingDownwardsTtStatsUnrankedInput, singleThingDownwardsTtStatsRankedOut],
        
        ['two things upwards', 'upwards', twoThingsUpwardsTtStatsUnrankedInput, twoThingsUpwardsTtStatsRankedOut],
        ['two things downwards', 'downwards', twoThingsDownwardsTtStatsUnrankedInput, twoThingsDownwardsTtStatsRankedOut],
        
        ['three things upwards', 'upwards', threeThingsUpwardsTtStatsUnrankedInput, threeThingsUpwardsTtStatsRankedOut],
        ['three things downwards', 'downwards', threeThingsDownwardsTtStatsUnrankedInput, threeThingsDownwardsTtStatsRankedOut],

        ['filters out non-trenders up', 'upwards', nonTrendersTtStatsUnrankedInput, [] ],
        ['filters out non-trenders down', 'downwards', nonTrendersTtStatsUnrankedInput, [] ],
        
    ])('%s', (_message, upOrdown, input, expectedResult) => {

        expect(fillInRankings(input, upOrdown)).toEqual(expectedResult)

    })

})