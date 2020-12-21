Feature: Daily Barchart Sdvances / Declines Scraper

    I want to scrape the data of barchart's top advancing and declining stocks over the past 1d, 5d, 1m timeframe (small cap us only for now).

    @focus
    Scenario: Scraping Barchart Trenders Info

        Given I'm logged in

        # -- Small Cap --

        # Small Cap - Trenders - today
        When I navigate to the "small-cap_gainers_today_main-view" page
        And I scrape the "small_cap_us" "gainers" for "today" on the "main-view", new data: "true"

        When I navigate to the "small-cap_gainers_today_technical-view" page
        And I scrape the "small_cap_us" "gainers" for "today" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "small_cap_us" "gainers" "today"

        # Small Cap - Losers - today
        When I navigate to the "small-cap_losers_today_main-view" page
        And I scrape the "small_cap_us" "losers" for "today" on the "main-view", new data: "true"

        When I navigate to the "small-cap_losers_today_technical-view" page
        And I scrape the "small_cap_us" "losers" for "today" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "small_cap_us" "losers" "today"

        # Small Cap - Trenders - 5d
        When I navigate to the "small-cap_gainers_5d_main-view" page
        And I scrape the "small_cap_us" "gainers" for "5d" on the "main-view", new data: "true"

        When I navigate to the "small-cap_gainers_5d_technical-view" page
        And I scrape the "small_cap_us" "gainers" for "5d" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "small_cap_us" "gainers" "5d"

        # Small Cap - Losers - 5d
        When I navigate to the "small-cap_losers_5d_main-view" page
        And I scrape the "small_cap_us" "losers" for "5d" on the "main-view", new data: "true"

        When I navigate to the "small-cap_losers_5d_technical-view" page
        And I scrape the "small_cap_us" "losers" for "5d" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "small_cap_us" "losers" "5d"

        # Small Cap - Trenders - 1m
        When I navigate to the "small-cap_gainers_1m_main-view" page
        And I scrape the "small_cap_us" "gainers" for "1m" on the "main-view", new data: "true"

        When I navigate to the "small-cap_gainers_1m_technical-view" page
        And I scrape the "small_cap_us" "gainers" for "1m" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "small_cap_us" "gainers" "1m"

        # Small Cap - Losers - 1m
        When I navigate to the "small-cap_losers_1m_main-view" page
        And I scrape the "small_cap_us" "losers" for "1m" on the "main-view", new data: "true"

        When I navigate to the "small-cap_losers_1m_technical-view" page
        And I scrape the "small_cap_us" "losers" for "1m" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "small_cap_us" "losers" "1m"

        And I'm done with the backend server.
