
const getUniqueSymbols = scrapedData => {

    let uniqueSymbols = {
        gainers: [],
        losers: []
    }

    // console.log('scraped data: ', scrapedData)

    Object.entries(scrapedData['categories']).forEach(([marketCap, gainersAndLosers]) => {

        Object.entries(gainersAndLosers).forEach(([gainerOrLoser, timePeriodData]) => {

            Object.entries(timePeriodData).forEach(([timePeriod, stocksData]) => {

                const symbolsWithHeaders = stocksData.map(stockDatum => stockDatum[0].trim())

                const symbols = symbolsWithHeaders.slice(1) // removes the first element, the literal string: 'Symbol'

                uniqueSymbols[gainerOrLoser] = [...symbols, ...uniqueSymbols[gainerOrLoser]]
            })

            uniqueSymbols[gainerOrLoser] = Array.from(new Set(uniqueSymbols[gainerOrLoser]))
        })
    })

    return uniqueSymbols
}

module.exports = {
    getUniqueSymbols
}