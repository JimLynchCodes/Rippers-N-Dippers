#!/bin/bash -l

# Print some nice things in the logs.
printf "=======================================\n\n"
printf "Running Super Scraper...\n"
printf "$(date)\n\n"

# Run the cron job!
# npm run scrape:headless


# npm run scrape:headless-largecap && npm run scrape:headless-midcap


# npm run scrape:headless-short && npm run scrape:headless-largecap && npm run scrape:headless-short-show-memory

# npm run create-db-object && npm run scrape:headless-largecap-show-memory && npm run scrape:headless-midcap-show-memory && npm run scrape:headless-smallcap-show-memory && npm run scrape:headless-microcap-show-memory

npm run create-db-object && npm run scrape:headless-largecap && npm run scrape:headless-midcap-show-memory && npm run scrape:headless-smallcap-show-memory && npm run scrape:headless-microcap-show-memory

printf "\nTriple Trender Scraper cronjob has completed!\n"