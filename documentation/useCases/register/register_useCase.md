# Use-Case Specification: Perfect Time
# 1. Register at PerfectTime
### 1.1 Brief Description

In this use-case the user fills out the registration form to register himself at PerfectTime. After that he is able to access the Website and can manage his trips.

### 1.2 Mockup of landing Page
View where the user is navigated to when not logged in.
![location view file missing][lv]

[lv]: login.png "Login View"

### 1.3 Registration view
View where the User is able to register.
![location edit view file missing][rv]

[rv]: register.png "Register View"

# 2 Flow of Events

### 2.1 Basic Flow
#### Activity Diagram

![activity diagram file missing][ad]

[ad]: register_activityDiagram.png "Activity Diagram"

#### Feature file

Link to [feature file](../../../features/register.feature).

## 3 Preconditions
1. The user has navigated to PerfectTime.
2. The user is not logged in.
3. The user has clicked on register button.

## 4 Postconditions
1. Synchronize database with added user.
2. Log in the user to PerfectTime

## 6 Function Points
N/A
<Tool from http://groups.umd.umich.edu/cis/course.des/cis525/js/f00/harvey/FP_Calc.html

The score is 28.48 function Points.

![function points file missing][fp]

[fp]: ./EditLocation_FunctionPoints.PNG "Function Points">


