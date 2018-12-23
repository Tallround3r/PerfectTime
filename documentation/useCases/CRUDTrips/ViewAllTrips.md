![mockup file missing][mu0]

[mu0]: ../../../src/images/logo_perfecttime.svg "PT Logo"
# Use Case Specification: Perfect Time
Last updated:
23rd December 2018

## 1. View all trips
This document references the Use Case <b>CRUD Trips</b>, which can be found <a href= "./CRUD_trips.md">here</a>.

### 1.1 Brief description

In this use case the user generate an overwiew over all trips, he or she owns or is a member of. A trip represents a whole vacation. Each trip has an owner (creator) and several members (optional, invited by the owner). The trip consists of some meta-data (target country, time frame, budget, etc.) and a collection of locations, that the travellers will visit during this trip. A trip can be either private (only accessible to owner and members) or public accessible to all users. 
There is a closely related use case <b> CRUD Trips </b>. This use case shows all the options the user has, once he or she selected a trip from the overview. Selecting a trip will always navigate the application to the view trip function.

### 1.2 Mockups

tbd.

## 2. Flow of events

This section shows the different flow of events for View All Trips function.
It will also show reference the feature files for automated testing.

### 2.1 Basic flow

![mockup file missing][mu2]

[mu2]: ./ViewAllTrips.png "View Trip"

### 2.2 Feature File

The feature files can be found <a href="../../../features" >here</a>.
The tests are still under development.

## 3. Preconditions

- The user has to be a registered user.
- The user has to be logged in.
- The user has to navigate to View All Trips using the button in the Navigation Bar.

## 4. Postcondistions
- The view has to be up-to-date.

## 5. Function points
Tool from <a href ="http://groups.umd.umich.edu/cis/course.des/cis375/projects/fp99/main.html">http://groups.umd.umich.edu </a>
The score is 10.68 function points.

#### Domain characteristics table

![mockup file missing][mu5]

[mu5]: ./function_points11.png "function points 1"

#### Complexity adjustment table

![mockup file missing][mu6]

[mu6]: ./function_points12.png "function points 2"


