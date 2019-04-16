Feature: Create new activity for a location

  @only #- not working bc check if btn null
  Scenario: The addActivity button is not visible for the user
    Given I am not logged in
    And I have opened a "location"
    Then There is no "add activity button"

#  @only - not working bc btn not implemented
  Scenario: The addActivity button is visible for the user
    Given I am logged in
    And I have opened a "location"
    When I click on the "add activity button"
    Then I am navigated to "activity/add"
#    it is checked wether url contains the string or not

  Scenario: User adds activity with valid data
    Given I am logged in
    And I have opened a "location"
    And I click on the "add activity button"
    When I insert valid data for the activity
    And I click the "save activity button"
    Then The activity view is shown with the inserted data

  Scenario: User adds activity with invalid data
    Given I am logged in
    And I have opened a "location"
    And I click on the "add activity button"
    When I insert invalid data for the activity
    Then I cant click on the "save activity button"
    And Wrong input is marked

