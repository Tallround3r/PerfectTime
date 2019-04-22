# Features tagged with @only are working, all others are not

Feature: Edit data of existing location

  Scenario: The editLocation button is not visible for the user
    Given I am not logged in
    And I have opened a "location"
    Then There is no "edit location button"

  Scenario: The editLocation button is visible for the user
    Given I am logged in
    And I have opened a "location"
    When I click on the edit button
    Then The editLocation view is displayed

  Scenario: User edits location with valid data
    Given I have navigated to "edit location view"
    When I insert valid location data
    And I click on the "save location button"
    Then The location view is shown with the updated data

  Scenario: User edits location with invalid data
    Given I have navigated to "edit location view"
    When I insert invalid location data
    Then I cant click on the "save location button"S
    And Wrong input is marked

