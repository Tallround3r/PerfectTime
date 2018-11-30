const perfectTimelocal = 'http://localhost:3000/';
const perfectTime = 'https://perfecttime-planyourtrip.firebaseapp.com/';
const perfectTimeLogin = 'http://localhost:3000/login';
const perfectTimeLocations = 'http://localhost:3000/locations';
const perfectTimeTestLocation = 'http://localhost:3000/location/id=XXX';

exports.url = (url) => {
    switch(url){
        case 'PerfectTime':
            return perfectTimelocal;
        case 'PerfectTimeLogin':
            return perfectTimeLogin;
        case 'PerfectTimeLocations':
            return perfectTimeLocations;
        case 'PerfectTimeTestLocation':
            return perfectTimeTestLocation;
    }
};