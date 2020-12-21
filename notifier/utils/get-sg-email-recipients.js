const logger = require('./logger')

const getSendgridTripleTrendersEmailRecipients = listId => {

  return new Promise(async resolve => {

    const client = require('@sendgrid/client');

    client.setApiKey(process.env.SENDGRID_KEY);

    const request = {
      method: 'GET',
      url: '/v3/marketing/contacts'
    };

    await client.request(request)
      .then(data => {

        const emailAddressesForTtSubscribers = data[0].body.result

        /**
         *  Uncomment below line to find the correct value for TT_SG_EMAIL_SUBSCRIBERS_LIST_ID
         *  */
        // logger.info('right from sg: ' + emailAddressesForTtSubscribers)

        const emailAddressesForTtSubscribersFiltered = emailAddressesForTtSubscribers
          .filter(userObj => {
            return userObj.list_ids.includes(listId)
          })
          .map(userObj => {
            return userObj.email
          })

        resolve(emailAddressesForTtSubscribersFiltered)

      }, err => {
        logger.log('err getting contacts! ', err)
      })
  })
}

module.exports = {
  getSendgridTripleTrendersEmailRecipients
}