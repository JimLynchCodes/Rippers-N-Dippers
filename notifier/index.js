
require('dotenv').config()
const logger = require('./logger')
const moment = require('moment')
const sg = require('@sendgrid/mail');
// const mongoFunctions = require('./mongo-functions')
const getSendgridTripleTrendersEmailRecipients = require('./get-sg-tg-email-recipients')
const sortByBcOpinion = require('./utils/sort-by-bc-opinion')
const readStocksTtAnalysis = require('./utils/mongo-functions').readStocksTtAnalysis
// const readStocksTtAnalysis = mongoFunctions.readStocksTtAnalysis
// const _readSectorsTtAnalysis = mongoFunctions.readSectorsTtAnalysis // TODO - show sectors too

const getEmailHeader = require('./utils/html-builder').getEmailHeader


let colorNextRow = true

const main = async () => {

  const currentDay = moment().format('MMMM DD, YYYY')

  // logger.info('Pulling the most recent analyzed us sector data for triple trenders...')
  // const analyzedSectors = await readSectorsTtAnalysis()
  // logger.info(`Pulled analyzed SECTOR data from ${analyzedSectors['date_scraped']} ${analyzedSectors['time_scraped']}`)
  // logger.info(analyzedSectors)

  const analyzedStocks = await readStocksTtAnalysis()
  logger.info(`Pulled analyzed STOCK data from ${analyzedStocks['date_scraped']} ${analyzedStocks['time_scraped']}`)

  // const largeCapTrendersDataTextableString = analyzedStocks.tt_stats['large_cap_us']['trenders']
  //   /**
  //    *  Sorting by "BC_Opinion"
  //    */
  //   .sort(sortByBcOpinion)
  //   .map(trenderObj => {
  //     return `${trenderObj.Symbol}: ${trenderObj['tg_weighted_change_%']}, ${trenderObj['BC_Opinion']}\n`
  //   })
  //   .join('')

  const largeCapTrendersTableRows = buildTtRowFromMongoData(analyzedStocks, 'trending_upwards')

  colorNextRow = true

  const largeCapLosersTableRows = buildTtRowFromMongoData(analyzedStocks, 'trending_downwards')

  // const largeCapLosersDataTextableString = analyzedStocks.tt_stats['large_cap_us']['losers']
  //   .sort(sortByBcOpinion)
  //   .map(trenderObj => {
  //     return `${trenderObj.Symbol}: ${trenderObj['tg_weighted_change_%']}, ${trenderObj['BC_Opinion']}\n`
  //   })
  //   .join('')

  const numberOfTrenders = analyzedStocks.tt_stats['large_cap_us']['trenders'].length
  const numberOfLosers = analyzedStocks.tt_stats['large_cap_us']['losers'].length

  logger.info(`Notifying of ${numberOfTrenders} trenders and ${numberOfLosers} losers.`)

  // const highVolumeTipsSection = `<h2>Unusually High Volume ✨</h2>` +
  //   '<p><i>Stocks with the highest 1 day / 20 day volume ratio.</i></p>' +
  //   '<h3>Trenders</h3>' +
  //   '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black; margin: auto;min-width:300px;">' +
  //   '<tr>' +
  //   `<th style="min-width:70px;"><h4>Symbol</h4></th>` +
  //   '<th><h4>1d / 20d Volume Ratio</h4></th>' +
  //   '</tr>' +

  //   getVolumeTipsRows(analyzedStocks.tips['trenders']['high_volm_ratio_1d_20d']) +

  //   '</table>' +
  //   '<br/>' +
  //   '</div>' +
  //   '<h3>Losers</h3>' +
  //   '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black; margin: auto;min-width:300px;">' +
  //   '<tr>' +
  //   '<th style="min-width:70px;"><h4>Symbol</h4></th>' +
  //   '<th><h4>1d / 20d Volume Ratio</h4></th>' +
  //   '</tr>' +

  //   getVolumeTipsRows(analyzedStocks.tips['losers']['high_volm_ratio_1d_20d']) +

  //   '</table>' +
  //   '<br/>' +
  //   '</div>' +
  //   '<br/>' +
  //   '<hr/>'

  // const relativeStrengthTipsSection = `<h2>Bouncin' Back 🏀</h2>` +
  //   '<p><i>In general, stocks with a low relative strength are oversold (go long),</i></p>' +
  //   '<p><i>and stocks with a high relative strength are overbought (go short).</i></p>' +
  //   '<h3>Oversold</h3>' +
  //   '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black; margin: auto;min-width:300px;">' +

  //   '<tr>' +
  //   '<th style="min-width:70px;"><h4>Symbol</h4></th>' +
  //   '<th><h4>Relative Strength</h4></th>' +
  //   '</tr>' +

  //   getLowRelStrTipsRows(analyzedStocks.tips['trenders']['rel_str_bands'], analyzedStocks.tips['losers']['rel_str_bands']) +

  //   '</table>' +
  //   '<br/>' +
  //   '</div>' +
  //   '<h3>Overbought</h3>' +
  //   '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black; margin: auto;min-width:300px;">' +
  //   '<tr>' +
  //   '<th style="min-width:70px;"><h4>Symbol</h4></th>' +
  //   '<th><h4>Relative Strength</h4></th>' +
  //   '</tr>' +

  //   getHighRelStrTipsRows(analyzedStocks.tips['trenders']['rel_str_bands'], analyzedStocks.tips['losers']['rel_str_bands']) +

  //   '</table>' +
  //   '<br/>' +
  //   '</div>' +
  //   '<br/>' +
  //   '<hr/>'

  // const goldMedalsSection = `<h2>Gold Medals 🥇</h2>` +
  //   '<p><i>The largest moves for each direction and time period.</i></p>' +
  //   '<h3>Trenders</h3>' +
  //   '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black; margin: auto;min-width:300px;">' +
  //   '<tr>' +
  //   '<th><h4>Time Period</h4></th>' +
  //   '<th><h4>Symbol</h4></th>' +
  //   '<th><h4>Price Change</h4></th>' +
  //   '</tr>' +
  //   `<tr bgcolor='#B9EDB9'>` +
  //   `<td>1d</td>` +
  //   `<td>${analyzedStocks.tips.trenders.gold_medals['1d'].symbol}</td>` +
  //   `<td>+${analyzedStocks.tips.trenders.gold_medals['1d'].value}%</td>` +
  //   '</tr>' +
  //   '<tr>' +
  //   `<td>5d</td>` +
  //   `<td>${analyzedStocks.tips.trenders.gold_medals['5d'].symbol}</td>` +
  //   `<td>+${analyzedStocks.tips.trenders.gold_medals['5d'].value}%</td>` +
  //   '</tr>' +
  //   `<tr bgcolor='#B9EDB9'>` +
  //   `<td>1m</td>` +
  //   `<td>${analyzedStocks.tips.trenders.gold_medals['1m'].symbol}</td>` +
  //   `<td>+${analyzedStocks.tips.trenders.gold_medals['1m'].value}%</td>` +
  //   '</tr>' +
  //   '</table>' +
  //   '<br/>' +
  //   '</div>' +
  //   '<h3>Losers</h3>' +
  //   '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black; margin: auto;min-width:300px;">' +
  //   '<tr>' +
  //   '<th><h4>Time Period</h4></th>' +
  //   '<th><h4>Symbol</h4></th>' +
  //   '<th><h4>Price Change</h4></th>' +
  //   '</tr>' +
  //   `<tr bgcolor='#B9EDB9'>` +
  //   `<td>1d</td>` +
  //   `<td>${analyzedStocks.tips.losers.gold_medals['1d'].symbol}</td>` +
  //   `<td>${analyzedStocks.tips.losers.gold_medals['1d'].value}%</td>` +
  //   '</tr>' +
  //   '<tr>' +
  //   `<td>5d</td>` +
  //   `<td>${analyzedStocks.tips.losers.gold_medals['5d'].symbol}</td>` +
  //   `<td>${analyzedStocks.tips.losers.gold_medals['5d'].value}%</td>` +
  //   '</tr>' +
  //   `<tr bgcolor='#B9EDB9'>` +
  //   `<td>1m</td>` +
  //   `<td>${analyzedStocks.tips.losers.gold_medals['1m'].symbol}</td>` +
  //   `<td>${analyzedStocks.tips.losers.gold_medals['1m'].value}%</td>` +
  //   '</tr>' +
  //   '</table>' +
  //   '<br/>' +
  //   '<br/>' +
  //   '<hr/>'

  // const silverMedalsSection = '<h2>Silver Medals 🥈</h2>' +
  //   '<p><i>The second largest moves for each direction and time period.</i></p>' +
  //   '<h3>Trenders</h3>' +
  //   '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black; margin: auto;min-width:300px;">' +
  //   '<tr>' +
  //   '<th><h4>Time Period</h4></th>' +
  //   '<th><h4>Symbol</h4></th>' +
  //   '<th><h4>Price Change</h4></th>' +
  //   '</tr>' +
  //   `<tr bgcolor='#B9EDB9'>` +
  //   `<td>1d</td>` +
  //   `<td>${analyzedStocks.tips.trenders.silver_medals['1d'].symbol}</td>` +
  //   `<td>+${analyzedStocks.tips.trenders.silver_medals['1d'].value}%</td>` +
  //   '</tr>' +
  //   '<tr>' +
  //   `<td>5d</td>` +
  //   `<td>${analyzedStocks.tips.trenders.silver_medals['5d'].symbol}</td>` +
  //   `<td>+${analyzedStocks.tips.trenders.silver_medals['5d'].value}%</td>` +
  //   '</tr>' +
  //   `<tr bgcolor='#B9EDB9'>` +
  //   `<td>1m</td>` +
  //   `<td>${analyzedStocks.tips.trenders.silver_medals['1m'].symbol}</td>` +
  //   `<td>+${analyzedStocks.tips.trenders.silver_medals['1m'].value}%</td>` +
  //   '</tr>' +
  //   '</table>' +
  //   '<br/>' +
  //   '</div>' +
  //   '<h3>Losers</h3>' +
  //   '<div style="background:rgb(255,255,255);max-width:600px;width:100%;margin:0px auto; text-align: center;">' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black; margin: auto;min-width:300px;">' +
  //   '<tr>' +
  //   '<th><h4>Time Period</h4></th>' +
  //   '<th><h4>Symbol</h4></th>' +
  //   '<th><h4>Price Change</h4></th>' +
  //   '</tr>' +
  //   `<tr bgcolor='#B9EDB9'>` +
  //   `<td>1d</td>` +
  //   `<td>${analyzedStocks.tips.losers.silver_medals['1d'].symbol}</td>` +
  //   `<td>${analyzedStocks.tips.losers.silver_medals['1d'].value}%</td>` +
  //   '</tr>' +
  //   '<tr>' +
  //   `<td>5d</td>` +
  //   `<td>${analyzedStocks.tips.losers.silver_medals['5d'].symbol}</td>` +
  //   `<td>${analyzedStocks.tips.losers.silver_medals['5d'].value}%</td>` +
  //   '</tr>' +
  //   `<tr bgcolor='#B9EDB9'>` +
  //   `<td>1m</td>` +
  //   `<td>${analyzedStocks.tips.losers.silver_medals['1m'].symbol}</td>` +
  //   `<td>${analyzedStocks.tips.losers.silver_medals['1m'].value}%</td>` +
  //   '</tr>' +
  //   '</table>' +
  //   '<br/>' +
  //   '</div>' +
  //   '<br/>' +
  //   '<hr/>'

  // const emailHeader = ''

  // const tipsSection = highVolumeTipsSection + relativeStrengthTipsSection + goldMedalsSection + silverMedalsSection

  // const trendersTable = '<br/><h2>All Triple Trenders & Losers Data</h2>' +
  //   '<h3>Trenders:</h3>' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black;">' +
  //   '<tr>' +
  //   tableHeaders() +
  //   '</tr>' +
  //   largeCapTrendersTableRows +
  //   '</table>' +
  //   '<br/>'

  // const losersTable = '<h3>Losers:</h3>\n' +
  //   '<table border="1" cellspacing="0" padding="5" style="border: 1px solid black;">' +
  //   '<tr>' +
  //   tableHeaders() +
  //   '</tr>' +
  //   largeCapLosersTableRows +
  //   '</table>' +
  //   '<br/>' +
  //   '<br/>' +
  //   '<br/>'

  // const emailFooter = '</<p>&nbsp;</p>' +
  //   `<p>Good luck and enjoy the ride!</p><br/>` +
  //   '<p>Have friends who want to receive the daily Triple Trenders report? <a href="https://cdn.forms-content.sg-form.com/f034a73f-a80f-11ea-8e17-928c85d443c0">Sign up here</a>!</p>' +
  //   '<br/>' +
  //   '<br/>' +
  //   `<p>We want to hear from YOU! I've you enjoy getting this email or have any questions at all, just reply to this email and say hello!</p>`
  //   '<div>' +
  //   '<a href="<%asm_group_unsubscribe_raw_url%>">Unsubscribe</a> | <a href="<%asm_preferences_raw_url%>">Manage Email Preferences</a>' +
  //   '</div>' +
  //   '<br/>' +
  //   '<p>Disclaimer: any information here may be incorrect. Invest at your own risk!</p>' +
  //   '</div>'

  // const fullTextEmail = emailHeader + tipsSection + trendersTable + losersTable + emailFooter
  const fullTextEmail = getEmailHeader(analyzedStocks) +
    getTrendingUpwardsSection(analyzedStocks.tt_stats.trending_upwards) +
    getTrendingDownwardsSection(analyzedStocks.tt_stats.trending_downwards) +
    getDefinitionsSection() +
    getFooterSection()

  // const shortenedTextMobile = `Hey there! 🤖\n` +
  //   `Triple Trenders stats for ${analyzedStocks['date_scraped']}:\n` +
  //   `Trenders: ${numberOfTrenders}\n` +
  //   `Losers: ${numberOfLosers}\n\n` +
  //   `May the gains be with you. 💪`

  if (JSON.parse(process.env.DISABLE_ALL_MESSAGE_SENDING)) {
    logger.info('All message sending has been disabled by the env variable, DISABLE_ALL_MESSAGE_SENDING: ', process.env.DISABLE_ALL_MESSAGE_SENDING)
  } else {

    const sgTtTrueRecipients = await getSendgridTripleTrendersEmailRecipients(process.env.TT_SG_EMAIL_SUBSCRIBERS_LIST_ID)

    logger.info(`sendgrid recipients: ${JSON.stringify(sgTtTrueRecipients)}`)

    logger.info(`PROD is (${process.env.PROD === 'true' ? 'true' : 'false'}) - ${process.env.PROD !== 'true' ? 'NOT' : ''} sending to real recipients...`)

    sgRecipients = process.env.PROD === 'true' ? sgTtTrueRecipients : ['mrdotjim@gmail.com']

    sgRecipients.forEach((recipient, i) => {

      sg.setApiKey(process.env.SENDGRID_KEY);
      const msg = {
        to: recipient,
        from: process.env.SG_FROM_EMAIL,
        // text: fullTextEmail,
        html: fullTextEmail,
        subject: `Triple Trenders Report! - ${analyzedStocks['date_scraped']}`,
        asm: {
          group_id: +process.env.SENDGRID_UNSUBSCRIBE_GROUP_ID
        }
      };

      const millisecondSeparator = 1000

      const waitTime = millisecondSeparator * i

      setTimeout(() => {
        sg.send(msg).then((resp) => {
          logger.info(`Mail has been sent to ${recipient}!`,
            { ...msg, html: '[hidden]' })

          if (i === (sgRecipients.length - 1)) {
            logger.info('\n\nThe notifications have been sent! 🥳\n')
            process.exit(0)
          }

        }).catch(err => {
          logge.info('error sending to recipient ', err)
        });

      }, waitTime)
    })
  }
}

main().catch(err => {

  logger.info('Error in the tg notifier! ', err)

})

// const buildTtRowFromMongoData = (analyzedStocks, trendersOrLosers) => {

//   return analyzedStocks.tt_stats['large_cap_us'][trendersOrLosers]
//     .sort(sortByBcOpinion)
//     .map(trenderObj => {

//       let tr

//       if (colorNextRow) {
//         tr = `<tr bgcolor='#B9EDB9'>`
//         colorNextRow = false
//       } else {
//         tr = `<tr>`
//         colorNextRow = true
//       }

//       return tr +
//         '<td style="min-width:70px">' +
//         trenderObj.Symbol +
//         '</td>' +
//         // '<td>' +
//         // trenderObj['tg_weighted_change_%'] +
//         // '</td>' +
//         '<td>' +
//         trenderObj['1d_change_%'].slice(0, -2) +
//         '</td>' +
//         '<td>' +
//         trenderObj['5d_change_%'].slice(0, -2) +
//         '</td>' +
//         '<td>' +
//         trenderObj['1m_change_%'].slice(0, -2) +
//         '</td>' +
//         '<td style="min-width:75px">' +
//         trenderObj['20d_rsi: '].slice(0, -2) +
//         '</td>' +
//         '<td style="min-width:100px">' +
//         trenderObj['1D Volm / 20D Volm: '] +
//         '</td>' +
//         '<td style="min-width:80px">' +
//         trenderObj['BC_Opinion'] +
//         '</td>' +
//         '</tr>'
//     })
//     .join('')
// }

// const buildRowFromMongoData = (analyzedStocks, trendersOrLosers) => {

//   return analyzedStocks.tt_stats['large_cap_us'][trendersOrLosers]
//     .sort(sortByBcOpinion)
//     .map(trenderObj => {

//       let tr

//       if (colorNextRow) {
//         tr = `<tr bgcolor='#B9EDB9'>`
//         colorNextRow = false
//       } else {
//         tr = `<tr>`
//         colorNextRow = true
//       }

//       return tr +
//         '<td style="min-width:70px">' +
//         trenderObj.Symbol +
//         '</td>' +
//         // '<td>' +
//         // trenderObj['tg_weighted_change_%'] +
//         // '</td>' +
//         '<td>' +
//         trenderObj['1d_change_%'].slice(0, -2) +
//         '</td>' +
//         '<td>' +
//         trenderObj['5d_change_%'].slice(0, -2) +
//         '</td>' +
//         '<td>' +
//         trenderObj['1m_change_%'].slice(0, -2) +
//         '</td>' +
//         '<td style="min-width:75px">' +
//         trenderObj['20d_rsi: '].slice(0, -2) +
//         '</td>' +
//         '<td style="min-width:100px">' +
//         trenderObj['1D Volm / 20D Volm: '] +
//         '</td>' +
//         '<td style="min-width:80px">' +
//         trenderObj['BC_Opinion'] +
//         '</td>' +
//         '</tr>'
//     })
//     .join('')
// }

// const getLowRelStrTipsRows = (trendersRelStrBands, losersRelStrBands) => {

//   const lowRelStrTips = [
//     ...trendersRelStrBands['0-10'],
//     ...trendersRelStrBands['10-20'],
//     ...trendersRelStrBands['20-30'],
//     ...trendersRelStrBands['30-40'],
//     ...losersRelStrBands['0-10'],
//     ...losersRelStrBands['10-20'],
//     ...losersRelStrBands['20-30'],
//     ...losersRelStrBands['30-40'],
//   ]
//     .sort((a, b) => +(a.value) - +(b.value))

//   return lowRelStrTips.map((tip, index) => {

//     const tr = (index % 2 === 1) ? '<tr>' : `<tr bgcolor='#B9EDB9'>`

//     return tr +
//       `<td>${tip.symbol}</td>` +
//       `<td>${tip.value}</td>` +
//       '</tr>'
//   }).reduce((acc, str) => acc + str, '')

// }

// const getHighRelStrTipsRows = (trendersRelStrBands, losersRelStrBands) => {

//   const highRelStrTips = [
//     ...trendersRelStrBands['90-100'],
//     ...trendersRelStrBands['80-90'],
//     ...trendersRelStrBands['70-80'],
//     ...trendersRelStrBands['60-70'],
//     ...losersRelStrBands['90-100'],
//     ...losersRelStrBands['80-90'],
//     ...losersRelStrBands['70-80'],
//     ...losersRelStrBands['60-70'],
//   ]
//     .sort((a, b) => +(b.value) - +(a.value))

//   return highRelStrTips.map((tip, index) => {

//     const tr = (index % 2 === 1) ? '<tr>' : `<tr bgcolor='#B9EDB9'>`

//     return tr +
//       `<td>${tip.symbol}</td>` +
//       `<td>${tip.value}</td>` +
//       '</tr>'
//   }).reduce((acc, str) => acc + str, '')

// }

// const tableHeaders = () => {

//   return '<th><h4>Symbol</h4></th>' +
//     // '<th><h4>TT % Change</h4></th>' +
//     '<th><h4>1 Day % Change</h4></th>' +
//     '<th><h4>5 Day % Change</h4></th>' +
//     '<th><h4>30 Day % Change</h4></th>' +
//     '<th><h4>20 Day<br/>Relative<br/>Strength</h4></th>' +
//     '<th><h4>Volume<br/>1 Day / 20 Day</h4></th>' +
//     '<th><h4>Analyst Opinion</h4></th>'
// }

// const getVolumeTipsRows = (volmRatiosObj) => {

//   const volumeTips = [
//     ...volmRatiosObj['+4'],
//     ...volmRatiosObj['+3_5-4'],
//     ...volmRatiosObj['+3-3_5'],
//     ...volmRatiosObj['+2_5-3'],
//     ...volmRatiosObj['+2-2_5']
//   ]
//     .sort((a, b) => +(b.value) - +(a.value))

//   return volumeTips.map((tip, index) => {

//     const tr = (index % 2 === 1) ? '<tr>' : `<tr bgcolor='#B9EDB9'>`

//     return tr +
//       `<td>${tip.symbol}</td>` +
//       `<td>${tip.value}</td>` +
//       '</tr>'
//   }).reduce((acc, str) => acc + str, '')

// }