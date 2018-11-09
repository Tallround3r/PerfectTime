const perfectTimelocal = 'http://localhost:3000/';
const perfectTime = 'https://perfecttime-planyourtrip.firebaseapp.com/';

exports.url = (url) => {
    switch(url){
        case 'PerfectTime':
            return perfectTimelocal;
    }
};