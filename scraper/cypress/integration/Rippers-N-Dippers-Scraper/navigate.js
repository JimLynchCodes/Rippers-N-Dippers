import { Given } from "cypress-cucumber-preprocessor/steps";

Given(`I'm logged in`, async (categoryObjectKey) => {

    cy.visit('https://www.barchart.com/login')

    console.log('cypress user is ' + Cypress.env('BARCHART_USER'))

    cy.get('input[placeholder="Login with email"]').type(Cypress.env('BARCHART_USER'))

    cy.get('input[placeholder="Password"]').type(Cypress.env('BARCHART_PW'))

    await cy.get('button:contains(Log In)').click()

    cy.wait(200)

})

Given(`I navigate to the {string} page`, (categoryObjectKey) => {

    const categoryToUrlMap = {

        // large cap 

        "large-cap_gainers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&&timeFrame=today&viewName=main',
        "large-cap_gainers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&timeFrame=today&viewName=technical',

        "large-cap_losers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&viewName=main&timeFrame=today',
        "large-cap_losers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&timeFrame=today&viewName=technical',

        "large-cap_gainers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&&timeFrame=5d&viewName=main',
        "large-cap_gainers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&timeFrame=5d&viewName=technical',

        "large-cap_losers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&viewName=main&timeFrame=5d',
        "large-cap_losers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&timeFrame=5d&viewName=technical',

        "large-cap_gainers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&&timeFrame=1m&viewName=main',
        "large-cap_gainers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&timeFrame=1m&viewName=technical',

        "large-cap_losers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&viewName=main&timeFrame=1m',
        "large-cap_losers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&timeFrame=1m&viewName=technical',

        
        // mid cap 

        "mid-cap_gainers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=mid_cap&page=all&&timeFrame=today&viewName=main',
        "mid-cap_gainers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=mid_cap&page=all&timeFrame=today&viewName=technical',

        "mid-cap_losers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=mid_cap&page=all&viewName=main&timeFrame=today',
        "mid-cap_losers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=mid_cap&page=all&timeFrame=today&viewName=technical',

        "mid-cap_gainers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=mid_cap&page=all&&timeFrame=5d&viewName=main',
        "mid-cap_gainers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=mid_cap&page=all&timeFrame=5d&viewName=technical',

        "mid-cap_losers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=mid_cap&page=all&viewName=main&timeFrame=5d',
        "mid-cap_losers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=mid_cap&page=all&timeFrame=5d&viewName=technical',

        "mid-cap_gainers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=mid_cap&page=all&&timeFrame=1m&viewName=main',
        "mid-cap_gainers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=mid_cap&page=all&timeFrame=1m&viewName=technical',

        "mid-cap_losers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=mid_cap&page=all&viewName=main&timeFrame=1m',
        "mid-cap_losers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=mid_cap&page=all&timeFrame=1m&viewName=technical',

        // small cap 

        "small-cap_gainers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=small_cap&page=all&&timeFrame=today&viewName=main',
        "small-cap_gainers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=small_cap&page=all&timeFrame=today&viewName=technical',

        "small-cap_losers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=small_cap&page=all&viewName=main&timeFrame=today',
        "small-cap_losers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=small_cap&page=all&timeFrame=today&viewName=technical',

        "small-cap_gainers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=small_cap&page=all&&timeFrame=5d&viewName=main',
        "small-cap_gainers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=small_cap&page=all&timeFrame=5d&viewName=technical',

        "small-cap_losers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=small_cap&page=all&viewName=main&timeFrame=5d',
        "small-cap_losers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=small_cap&page=all&timeFrame=5d&viewName=technical',

        "small-cap_gainers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=small_cap&page=all&&timeFrame=1m&viewName=main',
        "small-cap_gainers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=small_cap&page=all&timeFrame=1m&viewName=technical',

        "small-cap_losers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=small_cap&page=all&viewName=main&timeFrame=1m',
        "small-cap_losers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=small_cap&page=all&timeFrame=1m&viewName=technical',

        // micro cap 
        
        "micro-cap_gainers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=micro_cap&page=all&&timeFrame=today&viewName=main',
        "micro-cap_gainers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=micro_cap&page=all&timeFrame=today&viewName=technical',

        "micro-cap_losers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=micro_cap&page=all&viewName=main&timeFrame=today',
        "micro-cap_losers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=micro_cap&page=all&timeFrame=today&viewName=technical',

        "micro-cap_gainers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=micro_cap&page=all&&timeFrame=5d&viewName=main',
        "micro-cap_gainers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=micro_cap&page=all&timeFrame=5d&viewName=technical',

        "micro-cap_losers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=micro_cap&page=all&viewName=main&timeFrame=5d',
        "micro-cap_losers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=micro_cap&page=all&timeFrame=5d&viewName=technical',

        "micro-cap_gainers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=micro_cap&page=all&&timeFrame=1m&viewName=main',
        "micro-cap_gainers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=micro_cap&page=all&timeFrame=1m&viewName=technical',

        "micro-cap_losers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=micro_cap&page=all&viewName=main&timeFrame=1m',
        "micro-cap_losers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=micro_cap&page=all&timeFrame=1m&viewName=technical',

        // all exchanges

        // "all-us-exchanges_gainers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&&timeFrame=today&viewName=main',
        // "all-us-exchanges_gainers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&timeFrame=5d&viewName=technical',

        // "all-us-exchanges_losers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&viewName=main&timeFrame=5d',
        // "all-us-exchanges_losers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&timeFrame=5d&viewName=technical',

        // "all-us-exchanges_gainers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&&timeFrame=today&viewName=main',
        // "all-us-exchanges_gainers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&timeFrame=5d&viewName=technical',

        // "all-us-exchanges_losers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&viewName=main&timeFrame=5d',
        // "all-us-exchanges_losers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&timeFrame=5d&viewName=technical',
}

    cy.visit(categoryToUrlMap[categoryObjectKey])

})