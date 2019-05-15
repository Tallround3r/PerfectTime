Feature: Security and Access Control Testing

  Background:
    Given I have navigated to "PerfectTimeLogin"

  @only
  Scenario: The user should not be able to see restricted area edit trip
    And I am not logged in
#    Then I am not able to navigate to "edit trips page"

#  @only
  Scenario: The user should not be able to see restricted area add trip
    And I am not logged in
#    Then I am not able to navigate to "add trips page"

#  @only
  Scenario: The user should not be able to see restricted delete edit trip
    And I am not logged in
#    Then I am not able to navigate to "delete trips page"

