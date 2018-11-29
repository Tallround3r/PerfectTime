const perfectTimelocal = 'http://localhost:3000/';
const perfectTime = 'https://perfecttime-planyourtrip.firebaseapp.com/';
const perfectTimeTest = 'http://localhost:3000/login';

exports.url = (url) => {
    switch(url){
        case 'PerfectTime':
            return perfectTimelocal;
        case 'PerfectTimeTest':
            return perfectTimeTest;
    }
};