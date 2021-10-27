const puppet = require("puppeteer");
let cpage; // current page
(async function(){
    try {
        let browserobj = await puppet.launch({ headless: false, defaultViewport: null });
        let pagesArr= await browserobj.pages();
        cpage=pagesArr[0];
        
        
    } catch (error) {
        
    }
})()  // making and calling function at the same place 
