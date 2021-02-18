
const getUniqueSymbols = scrapedData => {

    let uniqueSymbols = {
        gainers: new Set(),
        losers: new Set()
    }

    Object.entries(scrapedData['categories']).forEach(([marketCap, gainersAndLosers]) => {

        Object.entries(gainersAndLosers).forEach(([gainerOrLoser, timePeriodData]) => {

            Object.entries(timePeriodData).forEach(([timePeriod, stocksData]) => {

                const symbolsWithHeaders = stocksData.map(stockDatum => stockDatum[0].trim())

                const symbols = symbolsWithHeaders.slice(1) // removes the first element, the literal string: 'Symbol'
                console.log('gainer or loser: ', gainerOrLoser)

                symbols.forEach(symbol => uniqueSymbols[gainerOrLoser].add(symbol))
            })

        })
    })

    console.log('ok')

    return {
        gainers: Array.from(uniqueSymbols.gainers),
        losers: Array.from(uniqueSymbols.losers)
    }
}

module.exports = {
    getUniqueSymbols
}