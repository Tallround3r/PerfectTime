Feature: Create new activity for a location

  Scenario: The addActivity button is not visible for the user
    Given I am not logged in 
    And I have opened a location
    Then There is no add button

  Scenario: The addActivity button is visible for the user
    Given I am logged in
    And I have opened a location
    When I click on the "add activity button"
    Then I am navigated to "activity/add"
#    it is checked wether url contains the string or not

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

