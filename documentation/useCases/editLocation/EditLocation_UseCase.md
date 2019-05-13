# Use-Case Specification: Perfect Time
# 1. Edit Location
### 1.1 Brief Description

In this use-case the user edits one of his trips locations. One trip has several locations and one location consists of a picture, some metadata, notes and links to useful websites and also contains a map where the locations' address or place is shown.
Also a User can add custom field into the location, which gives him more adjustment to his personal needs.
Moreover it is possible to view the locations actions directly in the detail view. Adding activities to the location is possible when editing location aswell.
### 1.2 Mockup of Location View
![location view file missing][lv]

[lv]: LocationsView.png "Location View"

### 1.3 Example location View
View on all locations of one trip.
![example location view file missing][lvf]

[lvf]: LocationsViewFilled.png "Location View"

### 1.4 Location detail view
Detailled view on one location.
![location detail view file missing][ldv]

[ldv]: detailLocationFilled.png "Location View"

### 1.5 Location edit view
View where the User is able to edit the location.
![location edit view file missing][lev]

[lev]: editLocationFilled.png "Location View"

# 2 Flow of Events

### 2.1 Basic Flow
#### Activity Diagram

![activity diagram file missing][ad]

[ad]: editLocation_activityDiagramm.png "Activity Diagram"

#### Feature file

Link to [feature file](../../../features/editActivity.feature).

## 3 Preconditions
1. The user has to be logged in at the site.
2. The user has to be owner or member of a trip with at least one location.
3. The user has navigated to location detail view and clicked on the edit button.

## 4 Postconditions
1. Synchronize database with updated data.

## 5 Function Points
Tool from [http://groups.umd.umich.edu](http://groups.umd.umich.edu/cis/course.des/cis525/js/f00/harvey/FP_Calc.html)

The score is 37.72 function points.

#### Domain Characteristic Table

![function points file missing][fp1]

[fp1]: ./editLocation_fpDomain.PNG "Domain Characterictics"

#### Complexity Adjustment Table

![function points file missing][fp2]

[fp2]: ./editLocation_fpComplexity.PNG "Complexity Adjustments"


