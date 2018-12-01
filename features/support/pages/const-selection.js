const {Selector} = require('testcafe');

const title = Selector('title');
const registerButton = Selector('#signIn');
const loginHeader = Selector('.h5').withText('Sign In');
const registrationHeader = Selector('.h5').withText('Create Account');
const firstNameRegister = Selector('#firstName');
const lastNameRegister = Selector('#lastName');
const usernameRegister = Selector('#username');
const emailRegister = Selector('#email');
const passwordRegister = Selector('#password');
const passwordConfirmRegister = Selector('#passwordConfirm');
const signUp = Selector('#signUpButton');
const signIn = Selector('#signInButton');
const addActivityButton = Selector('#addActivityButton');
const editActivityButton = Selector('#editActivityButton');
const saveActivityButton = Selector('#saveActivityButton');
const addLocationButton = Selector('#addLocationButton');
const editLocationButton = Selector('#editLocationButton');
const saveLocationButton = Selector('#saveLocationButton');
const locationTitle = Selector('#locationTitle');
const locationDescription = Selector('#locationDescription');
const locationDate = Selector('#locationDate');
const locationAddress = Selector('#locationAddress');
const activityTitle = Selector('#activityTitle');
const activityDescription = Selector('#activityDescription');
const activityDate = Selector('#activityDate');
const activityAddress = Selector('#activityAddress');

exports.select = (selection) => {
    switch(selection){
        case 'title':
            return title;
        case 'Register Button':
            return registerButton;
        case 'registration form':
            return registrationHeader;
        case 'login form':
            return loginHeader;
        case 'first name':
            return firstNameRegister;
        case 'last name':
            return lastNameRegister;
        case 'username':
            return usernameRegister;
        case 'email':
            return emailRegister;
        case 'password':
            return passwordRegister;
        case 'passwordConfirm':
            return passwordConfirmRegister;
        case 'Sign Up Button':
            return signUp;
        case 'Login Button':
            return signIn;
        case 'add activity button':
            return addActivityButton;
        case 'edit activity button':
            return editActivityButton;
        case 'save activity button':
            return saveActivityButton;
        case 'add location button':
            return addLocationButton;
        case 'edit location button':
            return editLocationButton;
        case 'save location button':
            return saveLocationButton;
        case 'locationTitle':
            return locationTitle;
        case 'locationDescription':
            return locationDescription;
        case 'locationDate':
            return locationDate;
        case 'locationAddress':
            return locationAddress;
        case 'activityTitle':
            return activityTitle;
        case 'activityDescription':
            return activityDescription;
        case 'activityDate':
            return activityDate;
        case 'activityAddress':
            return activityAddress;
    }
};