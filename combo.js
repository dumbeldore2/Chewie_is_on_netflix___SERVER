const puppeteer = require('puppeteer');

const fs = require('fs');
var date = fs.readFileSync('date.json');
var dateV2 = JSON.parse(date);

var naam = fs.readFileSync('name.json');
var naamV2 = JSON.parse(naam);

var combo = fs.readFileSync('combo.json');
var comboV2 = JSON.parse(combo);

var localList = {};
var comboLocalList = {};

async function start(){
    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null
    });

    //pagina openen
    const page = await browser.newPage();
    const url = 'https://www.netflix.com/be/BillingActivity';
    await page.goto(url);

    //info
    const email = 'yago.engels@gmail.com';
    const password = 'Judolessen12';

    //vul email adres is
    await page.waitForSelector('#id_userLoginId.nfTextField');
    await page.type('#id_userLoginId.nfTextField', email);
    
    //vul password in
    await page.waitForSelector('#id_password.nfTextField');
    await page.type('#id_password.nfTextField', password);
    
    //druk op de knop inloggen
    await page.waitForSelector('.btn.login-button.btn-submit.btn-small');
    await page.click('.btn.login-button.btn-submit.btn-small')

    await page.waitForSelector('div[data-uia="streaming-next-cycle"]');

    const textContent = await page.evaluate(() => {
        return document.querySelector('div[data-uia="streaming-next-cycle"]').innerHTML;
    });
    console.log(textContent);

    //vul de arraylist aan
    localList.date = textContent;

    var boolean = false;
    for(let i = 0; i < dateV2.length && boolean == false ; i++){
        if(dateV2[i].date == localList.date){
            boolean = true;
        }
    }

    if(!boolean){
        dateV2.push(localList);
    }

    var dateV3 = JSON.stringify(dateV2);
    fs.writeFileSync('date.json',dateV3,finish);

    function finish(err){
        console.log("lol")
    }
    browser.close();
;
    let laatsteDate = dateV2[dateV2.length - 1];
    console.log(laatsteDate);
    console.log(naamV2);

    function combomaker(){
        if(comboV2.length == 0){
            comboLocalList.persoon = naamV2[0].name;
            comboLocalList.plaats = naamV2[0].plaats;
            comboLocalList.date = laatsteDate.date;
        }

        if(comboV2.length != 0){
            console.log("lol tis soort van aant werken")
        }
        console.log(comboV2.length);
        console.log(comboLocalList)
    }

    combomaker()

    comboV2.push(comboLocalList);
    var comboV3 = JSON.stringify(comboV2);
    fs.writeFileSync('combo.json',comboV3,finish);

};


start();