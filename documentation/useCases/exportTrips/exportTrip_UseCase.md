# Use-Case Specification: Perfect Time
# 1.Export Trip
### 1.1 Brief Description

This use-case describes the export feature of trips. The user is able to export trips into JSON format.

### 1.2 Mockup of Trip View
View all trips.
![location view file missing][lv]

[lv]: TripsView.png "Trips View"

### 1.3 Example Trip View
Detail view of a trip with export button.
![example location view file missing][lvf]

[lvf]: TripDetailView.png "Trip Detail View"


### 2.1 Basic Flow
#### Activity Diagram

![activity diagram file missing][ad]

[ad]: exportTrip_activityDiagramm.png "Activity Diagram"


## 3 Preconditions
1. The user has to be logged in at the site.
2. The user has to be owner or member of a trip.
3. The user has navigated to trip detail view and clicked on the export button.

## 4 Postconditions
None.

## 5 Function Points
Tool from [http://groups.umd.umich.edu](http://groups.umd.umich.edu/cis/course.des/cis525/js/f00/harvey/FP_Calc.html)

The score is 34.2 function points.

#### Domain Characteristic Table

![function points file missing][fp1]

[fp1]: ./exportTrips_fpDomain.PNG "Domain Characterictics"

#### Complexity Adjustment Table

![function points file missing][fp2]

[fp2]: ./exportTrips_fpComplexity.PNG "Complexity Adjustments"
