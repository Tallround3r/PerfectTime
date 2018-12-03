const perfectTimelocal = 'http://localhost:3000/';
const perfectTime = 'https://perfecttime-planyourtrip.firebaseapp.com/';
const perfectTimeLogin = 'http://localhost:3000/login';
const perfectTimeLocations = 'http://localhost:3000/locations';
const perfectTimeTestLocation = 'http://localhost:3000/location/id=XXX';
const perfectTimeTestLocationEdit = 'http://localhost:3000/location/id=XXX/edit';
const perfectTimeTestActivity = 'http://localhost:3000/location/id=XXX/activitiy/id=XXX';
const perfectTimeTestActivityEdit = 'http://localhost:3000/location/id=XXX/activitiy/id=XXX/edit';

exports.url = (url) => {
    switch(url){
        case 'PerfectTime':
            return perfectTimelocal;
        case 'PerfectTimeLogin':
            return perfectTimeLogin;
        case 'PerfectTimeLocations':
            return perfectTimeLocations;
        case 'location':
            return perfectTimeTestLocation;
        case 'edit location view':
            return perfectTimeTestLocationEdit;
        case 'activity':
            return perfectTimeTestActivity;
        case 'edit activity view':
            return perfectTimeTestActivityEdit;
    }
};