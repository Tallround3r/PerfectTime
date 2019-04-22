# Features tagged with @only are working, all others are not

Feature: Create new location for a trip

#  @only - not working bc check if btn null
  Scenario: The addLocation button is not visible for the user
    Given I am not logged in
    And I have navigated to "PerfectTimeLocations"
    Then There is no "add activity button"

#  @only - not working bc btn not implemented
  Scenario: The addLocation button is visible for the user
    Given I am logged in
    And I have navigated to "PerfectTimeLocations"
    When I click on the "add location button"
    Then I am navigated to "location/add"

  Scenario: User adds location with valid data
    Given I am logged in
    And I have navigated to "PerfectTimeLocations"
    And I click on the "add location button"
    When I insert valid data for the location
    And I click the "save location button"
    Then The locations view is shown with the inserted data

  Scenario: User adds location with invalid data
    Given I am logged in
    And I have navigated to "PerfectTimeLocations"
    And I click on the "add location button"
    When I insert invalid data for the activity
    Then I cant click on the "save location button"
    And Wrong input is marked

