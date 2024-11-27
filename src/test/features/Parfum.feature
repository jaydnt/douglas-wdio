Feature: Verify the perfume page

  Scenario Outline: Verfiy the filter option in Highlights dropdown
    Given User navigates to the application
    When User click on "PARFUM" tab
    Then Verify user on the parfum page
    When I select the "Highlights" dropdown
    Then I select the "<FilterOption>" filter option from the "Highlights" dropdown
    Then Verify the "<FilterOption>" filter is applied

    Examples:
      | FilterOption |
      | NEU          |
      | Sale         |
