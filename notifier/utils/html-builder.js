
const buildTtRowFromMongoData = (analyzedStocks, trendersOrLosers) => {

    return analyzedStocks.tt_stats['large_cap_us'][trendersOrLosers]
        .sort(sortByBcOpinion)
        .map(trenderObj => {

            let tr

            if (colorNextRow) {
                tr = `<tr bgcolor='#B9EDB9'>`
                colorNextRow = false
            } else {
                tr = `<tr>`
                colorNextRow = true
            }

            return tr +
                '<td style="min-width:70px">' +
                trenderObj.Symbol +
                '</td>' +
                // '<td>' +
                // trenderObj['tg_weighted_change_%'] +
                // '</td>' +
                '<td>' +
                trenderObj['1d_change_%'].slice(0, -2) +
                '</td>' +
                '<td>' +
                trenderObj['5d_change_%'].slice(0, -2) +
                '</td>' +
                '<td>' +
                trenderObj['1m_change_%'].slice(0, -2) +
                '</td>' +
                '<td style="min-width:75px">' +
                trenderObj['20d_rsi: '].slice(0, -2) +
                '</td>' +
                '<td style="min-width:100px">' +
                trenderObj['1D Volm / 20D Volm: '] +
                '</td>' +
                '<td style="min-width:80px">' +
                trenderObj['BC_Opinion'] +
                '</td>' +
                '</tr>'
        })
        .join('')
}

const getEmailHeader = analyzedStocks => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">` +
    '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
    '<br/>' +
    '<h1>Triple Trenders</h1>' +
    '<p>The perfect synergy of value investing and technical analysis.</p>' +
    '<br/>' +
    `This report is based on data at market close on ${analyzedStocks['date_scraped']}. All stocks in the NYSE, Nasdaq, and AMEX exchanges were considered.` +
    '<br/>' +
    '<br/>' +
    '🏆' +
    '<br/>' +
    '<br/>' +
    '<hr/>' +
    '<br/>'

const getTrendingUpwardsSection = trendingUpwardsSymbols => `<div>` +
    `- Trending Upwards Section -` +
    `</div>`

const getTrendingDownwardsSection = trendingUpwardsSymbols => `<div>` +
    `- Trending Downwards Section -` +
    `</div>` +
    '<br/><h2>All Triple Trenders & Losers Data</h2>' +
    '<h3>Trenders:</h3>' +
    '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black;">' +
    '<tr>' +
    tableHeaders() +
    '</tr>' +
    largeCapTrendersTableRows +
    '</table>' +
    '<br/>'

const getDefinitionsSection = trendingUpwardsSymbols => `<div>` +
    `- Definitions Section -` +
    `</div>`

const getFooterSection = trendingUpwardsSymbols => `<div>` +
    `- Footer Section -` +
    `</div>` +
    '</<p>&nbsp;</p>' +
    `<p>Good luck and enjoy the ride!</p><br/>` +
    '<p>Have friends who want to receive the daily Triple Trenders report? <a href="https://cdn.forms-content.sg-form.com/f034a73f-a80f-11ea-8e17-928c85d443c0">Sign up here</a>!</p>' +
    '<br/>' +
    '<br/>' +
    `<p>We want to hear from YOU! I've you enjoy getting this email or have any questions at all, just reply to this email and say hello!</p>`
'<div>' +
    '<a href="<%asm_group_unsubscribe_raw_url%>">Unsubscribe</a> | <a href="<%asm_preferences_raw_url%>">Manage Email Preferences</a>' +
    '</div>' +
    '<br/>' +
    '<p>Disclaimer: any information here may be incorrect. Invest at your own risk!</p>' +
    '</div>'