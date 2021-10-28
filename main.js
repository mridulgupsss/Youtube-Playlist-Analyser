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
        const name = await cpage.evaluate(function(select){return document.querySelector(select).innerText}, "h1#title");
        console.log(name);
        await cpage.waitForSelector("#stats .ytd-playlist-sidebar-primary-info-renderer"); 
        let Alldata =await cpage.evaluate(getdata, "#stats .ytd-playlist-sidebar-primary-info-renderer");
        console.log( Alldata.noOfvideos, Alldata.noOfviews, Alldata.date );
    } catch (error) {
        console.log(error);
    }
})()  // making and calling function at the same place 


function getdata(select)
{
    let allElem=document.querySelectorAll(select);
    let noOfvideos = allElem[0].innerText;
    let noOfviews = allElem[1].innerText;
    let date = allElem[2].innerText;
    
    return{
        noOfvideos, noOfviews, date
    }

}