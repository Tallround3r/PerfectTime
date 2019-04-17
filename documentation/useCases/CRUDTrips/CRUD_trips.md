![mockup file missing][mu0]

[mu0]: ../../../src/images/logo_perfecttime.svg "PT Logo"
# Use Case Specification: Perfect Time
Last updated:
23rd December 2018

## 1. CRUD for trips
This use case is described as a CRUD (Create, Read, Update, Delete). However it is not a CRUD in the traditional way, because Create and Update have different options, as it is described below. This document references the Use Case <b>View All Trips</b>, which can be found <a href= "./ViewAllTrips.md">here</a>.

### 1.1 Brief description
In this use case the user can add, edit, view or delete a trip. A trip represents a whole vacation. Each trip has an owner (creator) and several members (optional, invited by the owner). The trip consists of some meta-data (target country, time frame, budget, etc.) and a collection of locations, that the travellers will visit during this trip. A trip can be either private (only accessible to owner and members) or public accessible to all users. Editing a trip will allow the user to create custom fields (e.g. link to travel blog), while creating a trip will only contain the basic fields.
There is a closely related use case <b> View All Trips </b>. This use case shows the user all trips he or she owns or is a member of. From there, a trip can be selected to be viewed, edited or deleted. One can also create a trip from that page.

### 1.2 Mockups

#### Select a trip from View All Trips
To be able to create a trip or view a trip, one may choose the correct button in the ViewAllTrips page.

![mockup file missing][mu10]

[mu10]: ./ViewAllTripsSelectionMockUp.png "Selecting / Creating a Trip"

#### Create Trip
![mockup file missing][mu11]

[mu11]: ./createTripMockUp.png "Create Trip"
#### View Trip
![mockup file missing][mu12]

[mu12]: ./viewTripMockUp.png "View Trip"
#### Edit Trip
![mockup file missing][mu13]

[mu13]: ./editTripMockUp.png "Edit Trip"
#### Delete Trip
![mockup file missing][mu14]

[mu14]: ./deleteTripMockUp.png "Delete Trip"
## 2. Flow of events

This section shows the different flow of events for the different CRUD functions.
It will also show reference the feature files for automated testing.

### 2.1 Basic flow

#### Create Trip
Create Trip can be accessed from View All Trips or from the Navigation Bar.

![mockup file missing][mu1]

[mu1]: ./CreateTrip.png "Create Trip"

#### View Trip
View trip can be accessed from View All Trips or from a search result screen.

![mockup file missing][mu2]

[mu2]: ./ViewTrip.png "View Trip"

#### Edit Trip
Edit Trip can only be accessed from view trip.

![mockup file missing][mu3]

[mu3]: ./EditTrip.png "Edit Trip"

#### Delete Trip
The delete function can only ce accessed from edit trip.

![mockup file missing][mu4]

[mu4]: ./DeleteTrip.png "Create Trip"

### 2.2 Feature File

The feature files can be found <a href="../../../features" >here</a>.
The tests are still under development.

## 3. Preconditions

#### General conditions
- The user has to be a registered user.
- The user has to be logged in.

#### Additional Conditions for View Trip
- The user has to be able to find the trip. (Public trip, or user is trip member / owner)
- The user has navigated to View All trips or triggerd a search request.

#### Additional Conditions for Edit Trip
- The user has to be a trip member.
- The user has to be editable by members.
- The user has navigated to View Trip.

#### Additional Conditions for Delete Trip
- The user has to be the trip owner.
- The user has navigated to Edit Trip.

## 4. Postcondistions
- The client and the host have to be synchronized.
- The view has to be up-to-date.

## 5. Function Points
Tool from [http://groups.umd.umich.edu](http://groups.umd.umich.edu/cis/course.des/cis525/js/f00/harvey/FP_Calc.html)

The score is 88.32 function points.

#### Domain Characteristic Table

![function points file missing][fp1]

[fp1]: ./CRUDTrips_fpDomain.png "Domain Characterictics"

#### Complexity Adjustment Table

![function points file missing][fp2]

[fp2]: ./CRUDTrips_fpComplexity.png "Complexity Adjustments"