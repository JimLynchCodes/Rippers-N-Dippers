
const axios = require('axios');

const hardcoded_iex_data = {
    AAIC: {
        stats: {
            companyName: 'Arlington Asset Investment Corp',
            marketcap: 121676781,
            week52high: 6.69,
            week52low: 1.7,
            week52change: -0.35190955221223186,
            sharesOutstanding: 33427687,
            float: 0,
            avg10Volume: 312423,
            avg30Volume: 297214,
            day200MovingAvg: 2.88,
            day50MovingAvg: 3.05,
            employees: 0,
            ttmEPS: -1.51,
            ttmDividendRate: 0.22499999403953552,
            dividendYield: 0.06181318517569657,
            nextDividendDate: '',
            exDividendDate: '2019-12-30',
            nextEarningsDate: '',
            peRatio: -2.220419728097228,
            beta: 1.6856088502847197,
            maxChangePercent: 32.21167883211679,
            year5ChangePercent: -0.407214396221806,
            year2ChangePercent: -0.46321393284275414,
            year1ChangePercent: -0.3530154103197597,
            ytdChangePercent: -0.3464991023339318,
            month6ChangePercent: 0.2907801418439717,
            month3ChangePercent: 0.3531598513011154,
            month1ChangePercent: 0.2907801418439717,
            day30ChangePercent: 0.2907801418439717,
            day5ChangePercent: 0.019607843137255054
        }
    },
    ACY: {
        stats: {
            companyName: 'Aerocentury Corp.',
            marketcap: 3756498,
            week52high: 5.2,
            week52low: 0.8001,
            week52change: -0.5040816326530613,
            sharesOutstanding: 1545884,
            float: 0,
            avg10Volume: 18203,
            avg30Volume: 20180,
            day200MovingAvg: 2.38,
            day50MovingAvg: 2.11,
            employees: 0,
            ttmEPS: 0,
            ttmDividendRate: 0,
            dividendYield: 0,
            nextDividendDate: '',
            exDividendDate: '',
            nextEarningsDate: '',
            peRatio: 0,
            beta: 0,
            maxChangePercent: -0.6238390092879257,
            year5ChangePercent: -0.7685714285714286,
            year2ChangePercent: -0.7849557522123893,
            year1ChangePercent: -0.5308880308880308,
            ytdChangePercent: -0.45999999999999996,
            month6ChangePercent: 0.1045454545454545,
            month3ChangePercent: 0.15981566820276512,
            month1ChangePercent: 0.21500000000000008,
            day30ChangePercent: 0.21500000000000008,
            day5ChangePercent: -0.08301886792452817
        }
    }
}

const getStatsForChunk = chunkOfSymbols => {

    return new Promise(async resolve => {

        console.log('max calls for this list: ', (process.env.MAX_TOTAL_IEX_CALLS_TO_MAKE / 2))
        console.log('original chunk: ', chunkOfSymbols)

        const chunkOfSymbolsString = chunkOfSymbols
            .slice(0, (process.env.MAX_TOTAL_IEX_CALLS_TO_MAKE / 2))
            .join(',')

        console.log('chunkOfSymbolsString ', chunkOfSymbolsString)

        const url = process.env.IEX_BASES_URL + '/stock/market/batch?types=stats&symbols=' +
            chunkOfSymbolsString + '&token=' + process.env.IEX_KEY

        console.log('url is: ', url)
        const axiosResult = await axios.get(url).catch(err => JSON.stringify(err))

        const flatArrayOFSymbols = Object.entries(axiosResult.data).map(([symbol, obj]) => {
            obj.stats.symbol = symbol
            return obj.stats
        })

        resolve(flatArrayOFSymbols)
    })
}

const getKeyStatsList = uniqueSymbolChunks => {

    return new Promise(resolve => {

        // console.log('uniqueSymbols ', uniqueSymbolChunks)

        let results = []

        uniqueSymbolChunks.forEach(async (chunkOfSymbols, i) => {

            console.log(`chunk ${i} has ${chunkOfSymbols.length} symbols.`)

            setTimeout(async () => {

                if (results.length <= (process.env.MAX_TOTAL_IEX_CALLS_TO_MAKE / 2)) {

                    console.log('calling...!')

                    const statsArray = await getStatsForChunk(chunkOfSymbols)

                    results = [...results, ...statsArray]

                    console.log('results now: ', results.length)
                }

                if (i === uniqueSymbolChunks.length - 1) {

                    console.log(`returning ${results.length} results...`)
                    resolve(results)
                }

            }, i * 600)

        })
    })
}

module.exports = {
    getKeyStatsList
}