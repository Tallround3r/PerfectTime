# Features tagged with @only are working, all others are not

Feature: Register to PerfectTime is working

  Background:
    Given I have navigated to "PerfectTimeLogin"

  @only
  Scenario: The user should be able to see the Register Button
    And I am not logged in
    Then There is a "Register Button" called "Sign Up"

  @only
  Scenario: The user is able to see the registration form
    And I am not logged in
    When I click on the "Register Button"
    Then There is a "registration form" called "Create Account"

  @only
  Scenario: The user is able to register with valid data
    And I am not logged in
    When I click on the "Register Button"
    And I insert valid Data
    And I click on the "Sign Up Button"
    Then There is a "login form" called "Sign In"

  @only
  Scenario: The user tries to register an account with invalid data
    And I am not logged in
    When I click on the "Register Button"
    And I insert invalid Data
    Then I cant click on "Sign Up Button"
