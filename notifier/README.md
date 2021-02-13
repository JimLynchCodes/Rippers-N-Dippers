# Rippers N' Dippers Notifier



This is a quick little node.js script that pulls information from the Alphavantage API about US sector performance and saves it into Mongo.



# Usage

## 0) Use Node v12
```
nvm use
```

## Other 0) Create a .env File

(Use `.env_EXAMPLE` as an example)

You can get a free api key from here: https://www.alphavantage.co/support/#api-key


## 1) Install Dependencies
```
npm i
```


## 2) Run the script
```
npm start
```

## 3) Schedule as Cron Job

By running the super-scraper.sh file on the given cron interval, it will run every weekday at 5:00pm. 

Running the commands straight in the crontab file is not advised because you need to set up the environment again each time which can get very cluttered quickly and doesn't offer bash commands. We can keep our crontab list clean and leverage bash running the project's bash script at the desired interval. 

```
0 17 * * 1-5 ~/Git-Projects/Ameritrader-Bots/tg-notifier/tg-notifier.sh >> /home/ubuntu/Git-Projects/Ameritrader-Bots/tg-notifier/logs/`date +\%Y-\%m-\%d`-cron.log 2>&1
```

Note the double side carots `>>` which is needed to append the output to the logs file, and the `2>&1` tells it to write both the standard console logs and errors to the logs file.


## dyna settings
Set up your domain name. In my case I'm using dynadot as the host of the domain and email hosting (around $12/year and $15/year, respectively).

## sg settings
Using jim's evaluates2 account for tt.

(Jim's mrdotjim email sg account for tg). 

Uses these sg features:

- unsubscribe group: the "unsubscribe" and "manage email preferences links are appended my sendrid and add /remove users to the sendgrid unsubscribe list, referred to by the "TT_SG_EMAIL_SUBSCRIBERS_LIST_ID" unsub id env variable.

- Signup Forms - uses a sendgrid signup form to register new users, keeps track of users in sendgrid, env variables:

- SENDGRID_KEY
- TT_SG_EMAIL_SUBSCRIBERS_LIST_ID
- SENDGRID_UNSUBSCRIBE_GROUP_ID
- SG_FROM_EMAIL

## mongo settings

change these env variables to your own mongo connect, database, and collection:

- MONGO_URI
- DATABASE_NAME
- STOCKS_TT_ANALYSIS_COLLECTION

- SEND_TO_ONLY_ADMIN

## "dev mode" config

these env variables allow for manually running through all the various things witout _actually_ sending emails to all the subscribed users:

- DISABLE_ALL_MESSAGE_SENDING
- SEND_TO_ONLY_ADMIN

## Sign Up Link

If you or a friend would like to sign up to recieve Rippers N' Dippers email notifactions, you can do so here:

https://cdn.forms-content.sg-form.com/a05e73a6-3ffa-11eb-914e-2e15f5059f35