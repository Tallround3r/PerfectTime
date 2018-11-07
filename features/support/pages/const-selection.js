const {Selector} = require('testcafe');

const menu = Selector('#show-menu');
const overlay = Selector('.menu-overlay');
const close = Selector('#hide-menu');
const search = Selector('.search-wrapper > form');
const searchfield = Selector('#ke_search_sword');
const searchresult = Selector('#kesearch_results');
const firstsearchresult = searchresult.find('div').nth(0);

exports.select = (selection) => {
    switch(selection){
        case 'Menü':
            return menu;
        case 'die Navigationsleiste':
            return overlay;
        case 'Schließen':
            return close;
        case 'suchen':
            return search;
        case 'suchFeld':
            return searchfield;
        case 'suchergebnisse':
            return searchresult;
        case 'erstesSuchergebnis':
            return firstsearchresult;
    }
};