Feature: View all trips that I own, or that I am a member of

  Scenario: I can access view all trips
    Given I am logged in
    And I navigated to ViewAllTrips
    Then I am on the ViewAllTrips page

  Scenario: I can select a trip from view all trips
    Given I am logged in
    And I navigated to ViewAllTrips
    And I choose the first trip of ViewAllTrips
    Then I can access the ViewTrip page

  Scenario: A created trip is shown in view all trips
    Given I am logged in
    And I click the AddTrip button in the NavBar
    And I insert valid trip data
    And I click on the save button
    And I navigated to ViewAllTrips
    Then I can see the new trip in the list
