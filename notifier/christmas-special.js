
require('dotenv').config()
const logger = require('./utils/logger')
const moment = require('moment')
const sg = require('@sendgrid/mail');

const getSendgridTripleTrendersEmailRecipients = require('./utils/get-sg-email-recipients').getSendgridTripleTrendersEmailRecipients
const readStocksTtAnalysis = require('./utils/mongo-functions').readStocksTtAnalysis

const getEmailHeader = require('./utils/html-builder').getEmailHeader
const getTrendingUpwardsSection = require('./utils/html-builder').getTrendingUpwardsSection
const getTrendingDownwardsSection = require('./utils/html-builder').getTrendingDownwardsSection
const getDefinitionsSection = require('./utils/html-builder').getDefinitionsSection
const getFooterSection = require('./utils/html-builder').getFooterSection


const christmasEmailHeader = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">` +
  '<div style="background:rgb(255,255,255);max-width:700px;width:100%;margin:0px auto; text-align: center;">' +
  '<br/>' +
  '<h1>Triple Trenders Sneak Peek</h1>' +
  '<br/>' +
  '<br/>' +
  '<p style="font-size: 1rem;">Wow, what a year! With 2020 coming to a close the holidays give us a chance to unwind, be with family, and forget about the daily stresses of life for a bit.</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">Lucky for me (and you!), the quarantine has allowed me to spend a ton of time coding, experimenting with trading algos, and drinking green dragon tincture... 🍵</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">As thanks for being one of the first few subscribers to the <i>Triple Gainers</i> daily newsletter, I\'d like to introduce you to a sneak peek at the new and improved, next iteration: "The Triple Trenders"!</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">Although it uses similar metrics, the Triple Trenders considers trend rate, dip percentage, and volume <i>at the same time</i> to give you a more clear picture of what equities to actually go long (or short), and it aims to dramatically simplify the effort needed to read the table.</p>' +
  '<p style="font-size: 1rem;">(rows nearer the top of the table are better. The bigger the three bars in the rankings cell, the better bet our TT algo thinks it will be)</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;"><i>Note: This email is super long! To see the the full content you will likely need to scroll to the bottom and click, "View entire message".</i></p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">While the Triple Gainers looked at only large cap US stocks, the Triple Trenders scans <i>all</i> stocks in the NYSA, Nasdaq, and AMEX, and we have added the "Market Cap" column to give you a rough idea of the size of the company.</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">Also, the PE Ratio has been added to the table as a reminder that we\'re investing in profit-generating companies and that when you hold stock you\'re buying the ownership of future profits of a company, proportional to the other investors who own that stock (we ain\'t just flippin\' cypto over here!).</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">Sometime next week I\'ll set the Triple Trenders email live, and you\'ll start receiving a Triple Trender report every day after the market closes.</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">Everyone who was signed up for Triple Gainers will be automatically subscribed to the new Triple Trenders list (if you wish to not be added, just reply to this email saying so).</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">Thanks so much for supporting me on this journey to build the ultimate stock tips picker, and enjoy the free recommendations!</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">I hope you enjoy the new email format. Stay safe, and have a great holiday break this year.</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">Rest up because we\'ve got work still to do!</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">And here\'s to us all crushing it in 2021. 🍻</p>' +
  '<br/>' +
  '<br/>' +
  '<br/>' +
  '<br/>' +
  '<hr/>' +
  '<br/>' +
  '<br/>' +
  '<h1>Triple Trenders</h1>' +
  '<br/>' +
  '<p style="font-size: 1rem;">A modern combination of high-growth value investing and technical trend analysis.</p>' +
  '<br/>' +
  '<p style="font-size: 1rem;">' +
  `This report is based on market close data from December 23, 2020.<br/><br/>All stocks in the NYSE, Nasdaq, and AMEX exchanges were considered.` +
  '</p>' +
  '<p style="font-size: 2rem;">' +
  '<div style="width:100%;text-align:center;width:auto;min-height:50px;">🏆</div>' +
  '</p>' +
  '<hr/>' +
  '<br/>'


const main = async () => {

  const currentDay = moment().format('MMMM DD, YYYY')

  const analyzedStocks = await readStocksTtAnalysis()

  logger.info(`Pulled analyzed STOCK data from ${analyzedStocks.date_analyzed} ${analyzedStocks.time_analyzed}`)

  const numberOfUpwardTrending = analyzedStocks.tt_stats.trending_upwards.length
  const numberOfDownwardTrending = analyzedStocks.tt_stats.trending_downwards.length

  logger.info(`Notifying of ${numberOfUpwardTrending} trenders and ${numberOfDownwardTrending} losers.`)

  // const fullTextEmail = getEmailHeader(analyzedStocks) +
  const fullTextEmail = christmasEmailHeader +
    getDefinitionsSection() +
    '<br/><br/><div><hr/></div><br/>' +
    getTrendingUpwardsSection(analyzedStocks.tt_stats.trending_upwards, 'trending_upwards') +
    '<br/><br/><div><hr/></div><br/>' +
    getTrendingDownwardsSection(analyzedStocks.tt_stats.trending_downwards, 'trending_downwards') +
    '<br/><br/><div><hr/></div><br/>' +
    getFooterSection()

  if (process.env.DISABLE_ALL_MESSAGE_SENDING === 'true') {
    logger.info('All message sending has been disabled by the env variable, DISABLE_ALL_MESSAGE_SENDING: ' + process.env.DISABLE_ALL_MESSAGE_SENDING)
    resolve(0)
  } else {

    return new Promise(async resolve => {

      const sgTtTrueRecipients = await getSendgridTripleTrendersEmailRecipients(process.env.TT_SG_EMAIL_SUBSCRIBERS_LIST_ID)

      logger.info(`sendgrid recipients: ${JSON.stringify(sgTtTrueRecipients)}`)

      logger.info(`SEND_TO_ONLY_ADMIN is ${process.env.SEND_TO_ONLY_ADMIN} -${process.env.SEND_TO_ONLY_ADMIN === 'true' ? ' NOT' : ''} sending to real recipients... ${process.env.SEND_TO_ONLY_ADMIN === 'true' ? 'only' : ''}: ${process.env.ADMIN_EMAIL}`)

      sgRecipients = process.env.SEND_TO_ONLY_ADMIN !== 'true' ? sgTtTrueRecipients : [process.env.ADMIN_EMAIL]

      sgRecipients.forEach((recipient, i) => {

        sg.setApiKey(process.env.SENDGRID_KEY);
        const msg = {
          to: recipient,
          from: process.env.SG_FROM_EMAIL,
          html: fullTextEmail,
          subject: `Triple Trenders Sneak Peek!`,
          asm: {
            group_id: +process.env.SENDGRID_UNSUBSCRIBE_GROUP_ID
          }
        };

        const millisecondSeparator = 1000

        const waitTime = millisecondSeparator * i

        setTimeout(() => {
          sg.send(msg).then((_resp) => {
            logger.info(`Mail has been sent to ${recipient}!`)

            if (i === (sgRecipients.length - 1)) {
              logger.info('The notifications have been sent! 🥳\n\n')
              resolve(0)
            }

          }).catch(err => {
            logge.info('error sending to recipient ', err)
          });

        }, waitTime)
      })
    })
  }
}

main()
  .then(ok => process.exit(ok))
  .catch(err => {
    logger.info('Error in the tg notifier! ', err)
    process.exit(1)
  })