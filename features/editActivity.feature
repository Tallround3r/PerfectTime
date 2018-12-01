Feature: Edit data of existing activity

  Scenario: The editActivity button is not visible for the user
    Given I am not logged in
    And I have opened a "activity"
    Then There is no "edit activity button"

  Scenario: The editActivity button is visible for the user
    Given I am logged in
    And I have opened a "activity"
    When I click on the edit button
    Then The editActivity view is displayed

  Scenario: User edits activity with valid data
    Given I have navigated to "edit activity view"
    When I insert valid activity data
    And I click on the "save activity button"
    Then The activity view is shown with the updated data

  Scenario: User edits activity with invalid data
    Given I have navigated to "edit activity view"
    When I insert invalid activity data
    Then I cant click on the "save activity button"
    And Wrong input is marked

