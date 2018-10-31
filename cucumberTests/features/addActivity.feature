Feature: Create new activity for a location

  Scenario: User is not logged in and cannot find the addActivity button
    Given I have opened a location
    Then There is no add button

  Scenario: User is logged in and is able to access addActivity
    Given I am logged in
    And I have opened a location
    When I click on the add button
    Then The addActicity view is diplayed

  Scenario: User adds activity with valid data
    Given I opened the addActivity view
    When I insert valid data
    And I click the save button
    Then The activity view is shown with the inserted data

  Scenario: User adds activity with invalid data
    Given I opened the addActivity view
    When I insert invalid data
    And I click the save button
    Then The addActivity view will mark incorrect data
    And Shows an error message

