const puppet = require("puppeteer");
let cpage; // current page
const link="https://www.youtube.com/playlist?list=PLI_TwOrHUsI8MQNW0BvBAwwHYKgyiiiDB";
(async function(){
    try {
        let browserobj = await puppet.launch({ headless: false, defaultViewport: null });
        let pagesArr= await browserobj.pages();
        cpage=pagesArr[0];
        await cpage.goto(link);
        await cpage.waitForSelector("h1#title");
        

        
    } catch (error) {
        console.log(error);
    }
})()  // making and calling function at the same place 
