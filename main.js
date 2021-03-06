const puppet = require("puppeteer");
let cpage; // current page
const link = "https://www.youtube.com/playlist?list=PLI_TwOrHUsI8MQNW0BvBAwwHYKgyiiiDB";

//  
(async function () {
    try {
        let browserobj = await puppet.launch({ headless: false, defaultViewport: null });
        let pagesArr = await browserobj.pages();
        cpage = pagesArr[0];
        await cpage.goto(link);

        await cpage.waitForSelector("h1#title");
        const name = await cpage.evaluate(function (select) { return document.querySelector(select).innerText }, "h1#title");
        console.log(name);

        await cpage.waitForSelector("#stats .ytd-playlist-sidebar-primary-info-renderer");
        let Alldata = await cpage.evaluate(getdata, "#stats .ytd-playlist-sidebar-primary-info-renderer");
        console.log(Alldata.noOfvideos, Alldata.noOfviews, Alldata.date);

        let totalVideos = Alldata.noOfvideos.split(" ")[0];

        await cpage.waitForSelector("#contents .style-scope .ytd-playlist-video-list-renderer");
        let currVideos = await getCurrVideosLength();

        let scrolledVideos = 0
        while (scrolledVideos < totalVideos) {
            console.log(currVideos);
            await scrollCurrPage();
            currVideos = await getCurrVideosLength();
            scrolledVideos = scrolledVideos + currVideos;
        }
        // await cpage.waitForSelector("#video-title", "#container>#thumbnail span.style-scope .ytd-thumbnail-overlay-time-status-renderer");
        let videoDataArr= await cpage.evaluate(getvideoData, "#video-title", "#container>#thumbnail span.style-scope .ytd-thumbnail-overlay-time-status-renderer");
               console.log(videoDataArr);
        



    } catch (error) {
        console.log(error);
    }
})()  // making and calling function at the same place 


////////////////////////////////////////////////////////////////////////////////////////



function getdata(select) {
    let allElem = document.querySelectorAll(select);
    let noOfvideos = allElem[0].innerText;
    let noOfviews = allElem[1].innerText;
    let date = allElem[2].innerText;

    return {
        noOfvideos, noOfviews, date
    }

}

async function getCurrVideosLength() {
    let currVideos = await cpage.evaluate(getVideosLength, "#contents .style-scope .ytd-playlist-video-list-renderer");
    return currVideos;

}

function getVideosLength(select) {
    let allVideoEleArr = document.querySelectorAll(select);
    return allVideoEleArr.length;
}

async function scrollCurrPage() {
    await cpage.evaluate(scrollCurrTab);
    function scrollCurrTab() {
        window.scrollBy(0, window.innerHeight);
    }
}

function getvideoData(videoTitleSelector, durationSelector)
{
    let videoTitleDataArr=document.querySelectorAll(videoTitleSelector);
    let durationDataArr=document.querySelectorAll(durationSelector);
    
    let finalArr=[];
    
    for(let i=0; i<durationDataArr.length; i++)
    {
        
        let title=videoTitleDataArr[i].innerText;
        let duration=durationDataArr[i].innerText;
        finalArr.push({title, duration});
    }
    
    
    return finalArr;

}