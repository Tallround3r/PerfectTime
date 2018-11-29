Feature: Register to PerfectTime is working

  Background:
    Given I have navigated to "PerfectTime"

  Scenario: The user should be able to see the Register Button
    And I am not logged in
    Then There is a Register Button

  Scenario: The user should be navigated to login Page
    And I am not logged in
    Then I can see the login form

  Scenario: The user is able to see the registration form
    And I am not logged in
    When I click on register
    Then The registration form shows up

  Scenario: The user is able to register with valid data
    And I am not logged in
    When I click on register
    And I insert valid Data
    And I click on register button
    Then I am navigated to the home site

  Scenario: The user tries to register an account with invalid data
    And I am not logged in
    When I click on register
    And I insert invalid Data
    And I click on register button
    Then I stay on the registration view
