async function I(){
    //doet de netflix en de combomaker
    const netfix = require('/Users/yagoe/Documents/AREA_51/DEPARTMENT_OF_NODE.JS/netflixScraper_V2/combo.js');
    console.log('I is gedaan');
}


async function taskmaster(){
    await I()
}

taskmaster()