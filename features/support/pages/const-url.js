const home = 'https://www.karlsruhe.dhbw.de/startseite.html';

exports.url = (url) => {
    switch(url){
        case 'Startseite':
            return home;
    }
}