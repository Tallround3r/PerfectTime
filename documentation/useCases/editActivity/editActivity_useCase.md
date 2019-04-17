# Use-Case Specification: Perfect Time
# 1. Edit Activity
### 1.1 Brief Description

One user can have different trips where he visits several locations. At every location he can do activities. In this use-case the user edits one activity. One activity consists of a picture, some metadata, notes and links to useful websites and also contains a map where the activities' address or place is shown.
Also a User can add custom fields into the Activity, which gives him more adjustment to his personal needs.

### 1.2 Activity detail view
Detailled view on one activity.
![activity detail view file missing][ldv]

[ldv]: detailActivityFilled.png "Activity View"

### 1.3 Activity edit view
View where the User is able to edit the activity.
![activity edit view file missing][lev]

[lev]: editActivityFilled.png "Activity View"

# 2 Flow of Events

### 2.1 Basic Flow
#### Activity Diagram

![activity diagram file missing][ad]

[ad]: editActivity_activityDiagramm.png "Activity Diagram"

#### Feature file

Link to [feature file](../../../features/editActivity.feature).

## 3 Preconditions
1. The user has to be logged in at the site.
2. The user has to be owner or member of a trip with at least one location.
3. This location needs to have one action.
4. The user has navigated to activities detail view and clicked on the edit button.

## 4 Postconditions
1. Synchronize database with updated data.

## 5 Function Points
Tool from [http://groups.umd.umich.edu](http://groups.umd.umich.edu/cis/course.des/cis525/js/f00/harvey/FP_Calc.html)

The score is 37.72 function points.

#### Domain Characteristic Table

![function points file missing][fp1]

[fp1]: ./editActivity_fpDomain.PNG "Domain Characterictics"

#### Complexity Adjustment Table

![function points file missing][fp2]

[fp2]: ./editActivity_fpComplexity.PNG "Complexity Adjustments"


