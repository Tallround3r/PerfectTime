![mockup file missing][mu0]

[mu0]: ../../../src/images/logo_perfecttime.svg "PT Logo"
# Use Case Specification: Perfect Time
Last updated:
11th April 2019

## 1. RUD for account
This use case is described as a RUD (Read, Update, Delete). The Create component is realised in the [register](../register/register_useCase.md) use case.

### 1.1 Brief description
With the ability to view the account details the user is able to see all the Data, deposited at PerfectTime. If details like the email, name or password are outdated the user also has the opportunity to change these values. Also if there is the wish to leafe Perfect Time the User can delete the account.

### 1.2 Mockups

#### General
To access the Account Page the User has to be at any site of Perfect Time and click on the setting wheel.
![mockup file missing][mu1]

[mu1]: ./anyViewMockUp.png "View Account"

#### View Account
Here the User can see his account. By clicking on edit he gets to the next step below.
![mockup file missing][mu12]

[mu12]: ./viewAccountMockUp.png "View Account"

#### Edit Account
The existing data can be modified and new data liek the address can be added.
![mockup file missing][mu13]

[mu13]: ./editAccountMockUp.png "Edit Account"

#### Delete Account
To delete the Account the User has to confirm by Entering his username.
![mockup file missing][mu14]

[mu14]: ./deleteAccountMockUp.png "Delete Account"
## 2. Flow of events

This section shows the different flow of events for the different RUD functions.

### 2.1 Basic flow

#### View Account
View Account can be accessed from the main view by clicking on options/account.

![mockup file missing][mu2]

[mu2]: ./viewAccount_activityDiagramm.png "View Account"

#### Edit Account
Edit Account is accessible from the view Account page.

![mockup file missing][mu3]

[mu3]: ./editAccount_activityDiagramm.png "Edit Account"

#### Delete Account
Edit Account also is accessible from the view Account page.

![mockup file missing][mu4]

[mu4]: ./deleteAccount_activityDiagramm.png "Create Account"

### 2.2 Feature File

Not needed.

## 3. Preconditions

#### General conditions
- The user has to be a registered user.
- The user has to be logged in.

## 4. Postconditions
- The client and the host have to be synchronized.
- The view has to be up-to-date.

## 5. Function points

Not needed at the moment.
Tool from <a href ="http://groups.umd.umich.edu/cis/course.des/cis375/projects/fp99/main.html">http://groups.umd.umich.edu </a>
The score is XX.XX function points.
#### Domain characteristics table

![mockup file missing][mu5]

[mu5]: ./function_points1.png "function points 1"

#### Complexity adjustment table

![mockup file missing][mu6]

[mu6]: ./function_points2.png "function points 2"