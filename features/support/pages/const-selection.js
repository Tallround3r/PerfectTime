const {Selector} = require('testcafe');

const title = Selector('title');

exports.select = (selection) => {
    switch(selection){
        case 'title':
            return title;
    }
};