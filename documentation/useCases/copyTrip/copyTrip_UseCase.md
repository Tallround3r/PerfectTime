# Use-Case Specification: Perfect Time
# 1. Copy Trip
### 1.1 Brief Description

This use-case describes the copy feature of trips. The user is able to copy a trip if he's the owner or a member of this trip.

### 1.2 Mockup of Trip View
View all trips.
![trip view file missing][lv]

[lv]: TripsView.png "Trips View"

### 1.3 Example Trip View
Detail view of a trip.
![example trip detail view file missing][lvf]

[lvf]: TripDetailView.png "Trip Detail View"

### 1.4 Trip Edit View
Edit view of a trip, with "Save as new" button.
![trip edit view file missing][lvf]

[lvf]: TripEditView.png "Trip Detail View"

### 2.1 Basic Flow
#### Activity Diagram

![activity diagram file missing][ad]

[ad]: copyTrip_activityDiagramm.png "Activity Diagram"


## 3 Preconditions
1. The user has to be logged in at the site.
2. The user has to be owner or member of a trip.
3. The user has navigated to trip edit view and clicked on the "save as new" button.

## 4 Postconditions
1. Save new trip to database.
