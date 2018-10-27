# Use-Case Specification: Perfect Time
# 1. Add Activity
## 1.1 Brief Description

In this use-case the user adds one of his trips activities. One trip has several activities and one activity consists of a description, a picture, some metadata, notes and links to useful websites and also contains a map where the activity takes place.

## 1.2 Mockup

### 1.2.1 Activities View
Shows an overview of all Activities in chronological order.

![mockup file missing][mu1]

[mu1]: ./ActivitiesView.png "Mockup"

### 1.2.2 Activity Add View

![mockup file missing][mu2]

[mu2]: ./AddActivity.png "Mockup"


# 2 Flow of Events

## 2.1 Basic Flow

### Activity Diagram

![activity diagram file missing][ad]

[ad]: ./addActivity_activityDiagramm.png "Activity Diagram"

### Feature File

[TODO] Feature Datei einfügen

# 3 Preconditions
1. The user has to be logged in at the site.
2. The user has to be owner or member of a trip.
3. The user has navigated to the trip view and clicked on the add activity button.

# 4 Postconditions
1. Synchronize client with database.
2. Update activities view in client.

# 5 Function Points
Tool from http://groups.umd.umich.edu

The score is ... function Points.

![function points file missing][fp]

[fp]: ./addActivity_FunctionPoints.png "Function Points"


