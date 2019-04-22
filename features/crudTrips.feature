# Features tagged with @only are working, all others are not

Feature: CRUD trips

  Scenario: I can view a trip that I own
    Given I am logged in
    And I navigated to ViewAllTrips
    And I choose the first trip of ViewAllTrips
    Then I can access the ViewTrip page

  Scenario: I can view a trip that I am a member of
    Given I am logged in
    And I navigated to ViewAllTrips
    And I choose the second trip of ViewAllTrips
    Then I can access the ViewTrip page

  Scenario: I can view a public trip
    Given I am logged in
    And I navigated to the default example trip
    Then I can access the ViewTrip page

  Scenario: I cannot view a private trip that I neither own nor participate in
    Given I am logged in
    And I navigated to the private trial trip
    Then I receive a forbidden notification

  Scenario: I can edit a trip that I am a member of
    Given I am logged in
    And I navigated to ViewAllTrips
    And I choose the second trip of ViewAllTrips
    And I click on the edit button
    Then I am on the EditTrip page

  Scenario: I edit a trip with valid data
    Given I am logged in
    And I navigated to ViewAllTrips
    And I choose the second trip of ViewAllTrips
    And I click on the edit button
    And I insert valid trip data
    And I click on the save button
    Then I am on the ViewTrip page with the new data in place


  Scenario: I edit a trip with invalid data
    Given I am logged in
    And I navigated to ViewAllTrips
    And I choose the second trip of ViewAllTrips
    And I click on the edit button
    And I insert invalid trip data
    And I click on the save button
    Then I receive an invalid data notification
    Then I am on the EditTrip page

  Scenario: I can create a new trip
    Given I am logged in
    And I click on the AddTrip button in the NavBar
    Then I am on the CreateTrip page

  Scenario: I create a new trip with valid data
    Given I am logged in
    And I click the AddTrip button in the NavBar
    And I insert valid trip data
    And I click on the save button
    Then I am on the ViewTrip page with the new data in place

  Scenario: I create a new trip with invalid data
    Given I am logged in
    And I click the AddTrip button in the NavBar
    And I insert invalid trip data
    And I click on the save button
    Then I receive an invalid data notification
    Then I am on the CreateTrip page

  Scenario: I can delete a trip that I own
    Given I am logged in
    And I navigated to ViewAllTrips
    And I choose the first trip of ViewAllTrips
    And I click on the edit button
    And I click on the delete button
    And I reply with yes
    Then I receive a Successfully Deleted notification

  Scenario: I cannot delete a trip that I am only a member of
    Given I am logged in
    And I navigated to ViewAllTrips
    And I choose the second trip of ViewAllTrips
    And I click on the edit button
    And I click on the delete button
    Then I receive a forbidden notification
