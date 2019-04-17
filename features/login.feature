Feature: Register to PerfectTime is working

  Background:
    Given I have navigated to "PerfectTimeLogin"

  @only
  Scenario: The user should be navigated to login Page
    And I am not logged in
    Then I am navigated to "http://localhost:3000/login"

  @only
  Scenario: The user tries to login with invalid data
    And I am not logged in
    And I insert invalid login Data
    When I click on the "Login Button"
    Then I stay at "http://localhost:3000/login"

  @only
  Scenario: The user tries to login with valid data
    And I am not logged in
    And I insert valid login Data
    When I click on the "Login Button"
    Then I am navigated to "/trips"