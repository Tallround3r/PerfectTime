# Use-Case Specification: Perfect Time

## 1. Create Activity
### 1.1 Brief Description

In this use-case the user adds one of his trips activities. One trip has several activities and one activity consists of a description, a picture, some metadata, notes and links to useful websites and also contains a map where the activity takes place. The fields the User has to fill in, when adding an Activity are just some Basic ideas. When editing the activity later on it will be possible to add custom fields to the Activity.

### 1.2 Mockup

#### Activities View
Shows an overview of all Activities in chronological order.

![mockup file missing][mu1]

[mu1]: ./ActivitiesView.png "Mockup"

#### Activity Add View

![mockup file missing][mu2]

[mu2]: ./AddActivity.png "Mockup"


## 2 Flow of Events

### 2.1 Basic Flow

#### Activity Diagram

![activity diagram file missing][ad]

[ad]: ./addActivity_activityDiagramm.png "Activity Diagram"

#### Feature file
Link to [feature file](../../../features/addActivity.feature).


## 3 Preconditions
1. The user has to be logged in at the site.
2. The user has to be owner or member of a trip.
3. The user has navigated to the trip view and clicked on the add activity button.


## 4 Postconditions
1. Synchronize client with database.
2. Update activities view in client.


## 5 Function Points
Tool from [http://groups.umd.umich.edu](http://groups.umd.umich.edu/cis/course.des/cis525/js/f00/harvey/FP_Calc.html)

The score is 37.72 function points.

#### Domain Characteristic Table

![function points file missing][fp1]

[fp1]: ./addActivity_fpDomain.png "Domain Characterictics"

#### Complexity Adjustment Table

![function points file missing][fp2]

[fp2]: ./addActivity_fpComplexity.png "Complexity Adjustments"