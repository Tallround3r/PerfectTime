# Use-Case Specification: Perfect Time
# 1. Add Location
### 1.1 Brief Description

In this use-case the user adds a location to of his trips. One trip has several locations and one location consists of a picture, some metadata, notes and links to useful websites and also contains a map where the locations' address or place is shown.

### 1.2 Mockup of Location View
![location view file missing][lv]

[lv]: LocationsViewFilled.png "Location View"

### 1.3 Location add view
View where the User is able to add the location.
![location add view file missing][lav]

[lav]: addLocationFilled.png "Location View"

# 2 Flow of Events

### 2.1 Basic Flow
#### Activity Diagram

![activity diagram file missing][ad]

[ad]: AddLocation_ActivityDiagramm.png "Activity Diagram"

#### Feature file

Link to [feature file](../../../features/editActivity.feature).

## 3 Preconditions
1. The user has to be logged in at the site.
2. The user has to be owner or member of a trip.
3. The user has navigated to location detail view and clicked on the edit button.

## 4 Postconditions
1. Synchronize database with added data.

## 6 Function Points
N/A
<Tool from http://groups.umd.umich.edu/cis/course.des/cis525/js/f00/harvey/FP_Calc.html

The score is 28.48 function Points.

![function points file missing][fp]

[fp]: ./EditLocation_FunctionPoints.PNG "Function Points">


