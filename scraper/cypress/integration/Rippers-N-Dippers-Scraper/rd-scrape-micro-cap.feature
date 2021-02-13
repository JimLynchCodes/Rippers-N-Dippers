Feature: Daily Barchart Advances / Declines Scraper

    I want to scrape the data of barchart's top advancing and declining stocks over the past 1d, 5d, 1m timeframe (micro cap us only for now).

    @focus
    Scenario: Scraping Barchart Trenders Info

        Given I'm logged in

        # -- Micro Cap --

        # Micro Cap - Trenders - today
        When I navigate to the "micro-cap_gainers_today_main-view" page
        And I scrape the "micro_cap_us" "gainers" for "today" on the "main-view", new data: "true"

        When I navigate to the "micro-cap_gainers_today_technical-view" page
        And I scrape the "micro_cap_us" "gainers" for "today" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "micro_cap_us" "gainers" "today"

        # Micro Cap - Losers - today
        When I navigate to the "micro-cap_losers_today_main-view" page
        And I scrape the "micro_cap_us" "losers" for "today" on the "main-view", new data: "true"

        When I navigate to the "micro-cap_losers_today_technical-view" page
        And I scrape the "micro_cap_us" "losers" for "today" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "micro_cap_us" "losers" "today"

        # Micro Cap - Trenders - 5d
        When I navigate to the "micro-cap_gainers_5d_main-view" page
        And I scrape the "micro_cap_us" "gainers" for "5d" on the "main-view", new data: "true"

        When I navigate to the "micro-cap_gainers_5d_technical-view" page
        And I scrape the "micro_cap_us" "gainers" for "5d" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "micro_cap_us" "gainers" "5d"

        # Micro Cap - Losers - 5d
        When I navigate to the "micro-cap_losers_5d_main-view" page
        And I scrape the "micro_cap_us" "losers" for "5d" on the "main-view", new data: "true"

        When I navigate to the "micro-cap_losers_5d_technical-view" page
        And I scrape the "micro_cap_us" "losers" for "5d" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "micro_cap_us" "losers" "5d"

        # Micro Cap - Trenders - 1m
        When I navigate to the "micro-cap_gainers_1m_main-view" page
        And I scrape the "micro_cap_us" "gainers" for "1m" on the "main-view", new data: "true"

        When I navigate to the "micro-cap_gainers_1m_technical-view" page
        And I scrape the "micro_cap_us" "gainers" for "1m" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "micro_cap_us" "gainers" "1m"

        # Micro Cap - Losers - 1m
        When I navigate to the "micro-cap_losers_1m_main-view" page
        And I scrape the "micro_cap_us" "losers" for "1m" on the "main-view", new data: "true"

        When I navigate to the "micro-cap_losers_1m_technical-view" page
        And I scrape the "micro_cap_us" "losers" for "1m" on the "technical-view", new data: "false"

        Then I update the database's bc scrape object for "micro_cap_us" "losers" "1m"

        And I'm done with the backend server.
