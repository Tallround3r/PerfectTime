Feature: Website shows up correct Metadata

  Background:
    Given I have navigated to "PerfectTime"

  @only
  Scenario: Website Title is correct
    Then the "title" should be "Perfect Time"


