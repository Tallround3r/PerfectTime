Feature: Edit data of existing location

  Scenario: User is not logged in and cannot find the editLocation button
    Given I have opened a location
    Then There is no edit button

  Scenario: User is logged in and is able to access editlocation
    Given I am logged in
    And I have opened a location
    When I click on the edit button
    Then The editLocation view is diplayed

  Scenario: User edits location with valid data
    Given I opened the editLocation view
    When I insert valid data
    And I click the save button
    Then The location view is shown with the updated data

  Scenario: User edits location with invalid data
    Given I opened the editLocation view
    When I insert invalid data
    And I click the save button
    Then The editLocation view will mark incorrect data
    And Shows an error message

