
const getEmailHeader = analyzedStocks => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">` +
    '<div style="background:rgb(255,255,255);max-width:700px;width:100%;margin:0px auto; text-align: center;">' +
    '<br/>' +
    '<h1>Triple Trenders</h1>' +
    '<br/>' +
    '<p style="font-size: 1rem;">A modern combination of high-growth value investing and technical trend analysis.</p>' +
    '<br/>' +
    '<p style="font-size: 1rem;">' +
    `This report is based on market close data from ${analyzedStocks.date_analyzed}.<br/><br/>All stocks in the NYSE, Nasdaq, and AMEX exchanges were considered.` +
    '</p>' +
    '<p style="font-size: 1.5rem;">' +
    '🏆' +
    '</p>' +
    '<hr/>' +
    '<br/>'

const tableHeaders = () => {

    return '<tr>' +
        '<th><h4>Symbol</h4></th>' +
        '<th><h4>Trend<br/>Rate</h4></th>' +
        '<th><h4>Dip<br/>Percentage</h4></th>' +
        '<th><h4>Volume<br/>Ratio</h4></th>' +
        '<th><h4>Rankings</h4></th>' +
        '<th><h4>Market<br/>Cap</h4></th>' +
        '<th><h4>PE Ratio</h4></th>' +
        '</tr>'
}

const buildTtRowFromStocksArray = (stocksArray, upwardsOrDownwards) => {

    let colorNextRow = true

    console.log('up or down: ', upwardsOrDownwards)

    return stocksArray
        .map(trenderObj => {

            let tr

            if (colorNextRow) {
                tr = upwardsOrDownwards === 'trending_upwards' ? 
                    `<tr bgcolor='#B9EDB9'>` :
                    `<tr bgcolor='#ff9994'>`
                colorNextRow = false
            } else {
                tr = `<tr>`
                colorNextRow = true
            }

            const trendBarHeight = 2 + Math.floor(43 * trenderObj.rankings.trend)
            const dipBarHeight = 2 + Math.floor(43 * trenderObj.rankings.dip)
            const volumeBarHeight = 2 + Math.floor(43 * trenderObj.rankings.volume)

            return tr +
                '<td style="min-width:83px">' +
                trenderObj.symbol +
                '</td>' +
                '<td style="min-width:78px">' +
                trenderObj.trend_rate +
                '</td>' +
                '<td style="min-width:110px">' +
                trenderObj.dip_percentage +
                '</td>' +
                '<td style="min-width:80px">' +
                trenderObj.volume_ratio +
                '</td>' +
                '<td style="min-width: 85px; min-height: 50px; padding: 0.5rem; display: flex;">' +

                `<div style="background-color: red; min-width: 15px; min-height: ${trendBarHeight}px; margin: auto auto 0 auto; border: 1.5px solid black;"></div>` +
                `<div style="background-color: blue; min-width: 15px; min-height: ${dipBarHeight}px; margin: auto auto 0 auto; border: 1.5px solid black;"></div>` +
                `<div style="background-color: yellow; min-width: 15px; min-height: ${volumeBarHeight}px; margin: auto auto 0 auto; border: 1.5px solid black;"></div>` +

                '</td>' +
                '<td style="min-width:75px">' +
                trenderObj.market_cap_group +
                '</td>' +
                '<td style="min-width:87px">' +
                trenderObj.pe_ratio +
                '</td>' +
                '</tr>'
        })
        .join('')
}

// const largeCapTrendersTableRows = buildTtRowFromMongoData(analyzedStocks, 'trending_upwards')

// colorNextRow = true

// const largeCapLosersTableRows = buildTtRowFromMongoData(analyzedStocks, 'trending_downwards')

const getTrendingUpwardsSection = (trendingUpwardsSymbols, upwardsOrDownwards) => `<div>` +
    '<br/>' +
    '<h2>Trending Upwards</h2>' +
    '<p style="font-size: 1rem;">Go <i><strong>LONG</strong></i> these upward trending equities that have dipped downwards.</p>' +
    '<table border="1" cellspacing="0" padding="0" style="border: 1px solid black; font-size: 1rem; margin: auto;">' +
    tableHeaders() +
    buildTtRowFromStocksArray(trendingUpwardsSymbols, upwardsOrDownwards) +
    '</table>' +
    '</div>' +
    '<br/>'

const getTrendingDownwardsSection = (trendingDownwardsSymbols, upwardsOrDownwards) => `<div>` +
    '<br/>' +
    '<h2>Trending Downwards</h2>' +
    '<p style="font-size: 1rem;">Go <i><strong>SHORT</strong></i> these downward trending equities that have dipped upwards.</p>' +
    '<table border="1" cellspacing="0" padding="0" style="border: 1px solid black; font-size: 1rem; margin: auto;">' +
    tableHeaders() +
    buildTtRowFromStocksArray(trendingDownwardsSymbols, upwardsOrDownwards) +
    '</table>' +
    '</div>' +
    '<br/>'

const getDefinitionsSection = trendingUpwardsSymbols => `<br/><br/><div style="text-align: left; max-width: 550px; margin: auto; padding: 0 1rem; border: .15rem solid black; border-radius: 0.5rem;">` +
    '<h2>Definitions</h2>' +
    '<p style="font-size: 1rem;"><strong><u>Symbol</u></strong> - The ticker of a given stock or financial instrument.</p>' +
    '<p style="font-size: 1rem;"><strong><u>Trend Rate</u></strong> - The rate at which the stock has been trending over the past 6 months.</p>' +
    '<p style="font-size: 1rem;">(a higher positive number represents a stronger upward trend, and a lower negative number represents a stronger downwards trend)</p>' +
    `<p style="font-size: 1rem;"><strong><u>Dip Percentage</u></strong> - The percentage a stock's price has changed over the past 5 days.</p>` +
    `<p style="font-size: 1rem;"><strong><u>Rankings</u></strong> - The three bars respectively represent how a stock's trend rate, dip %, and volume ratio compare to other symbols also trending in that direction for the current day.</p>` +
    '<p style="font-size: 1rem;">(a large bar indicates a strong signal for the corresponding indicator)</p>' +
    '<p style="font-size: 1rem;"><strong><u>Market Cap</u></strong> - A high-level group describing the size of of company based on the total value of all shares.</p>' +
    '<p style="font-size: 1rem;"><strong><u>PE Ratio</u></strong> - Compares the price per share of a stock to the earnings per share.</p>' +
    `</div>`

const getFooterSection = trendingUpwardsSymbols => '<br/><br/>' +
    `<p style="font-size: 1rem;">Good luck and enjoy the ride!</p><br/>` +
    '<p style="font-size: 1rem;">Have friends who want to receive the daily Triple Trenders report? <a href="https://cdn.forms-content.sg-form.com/f034a73f-a80f-11ea-8e17-928c85d443c0">Sign up here</a>!</p>' +
    '<br/>' +
    `<p style="font-size: 1rem;">We want to hear from YOU! If you enjoy getting this email or have any questions at all, just reply to this email and say hello!</p>` +
    '<div>' +
    '<br/>' +
    '<p style="font-size: 1rem;">Disclaimer: any information here may be incorrect. Invest at your own risk!</p>' +
    '</div>' +
    '<br/>' +
    '<br/>' +
    '<div>' +
    '<a href="<%asm_group_unsubscribe_raw_url%>">Unsubscribe</a> | <a href="<%asm_preferences_raw_url%>">Manage Email Preferences</a>' +
    '<br/>' +
    '</div>'

module.exports = {
    getEmailHeader,
    getTrendingUpwardsSection,
    getTrendingDownwardsSection,
    getDefinitionsSection,
    getFooterSection
}