console.log("background.js");
let activeTabId = 0;
//Listener
chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.get(tab.tabId, (current_tab_info) => {
        activeTabId = tab.tabId
        // console.log('get', current_tab_info);
        console.log("onActivated get", current_tab_info.url);
        if (
            current_tab_info.url.search("www.iranjib.ir") !== -1 ||
            current_tab_info.url.search("digikala.com") !== -1
        ) {
            chrome.tabs.executeScript(null, { file: "./foreground.js" }, (p) => {
                console.log("%cinjected", "background:green", p);
            }); // tab id or nul for curent ,
        }
    });
});

//get data from foredround
chrome.runtime.onMessage.addListener((req, sender, sendResponce) => {
    if (req.type) {
        console.log('onMessage.addListener', req, sender, sendResponce);
        //send data to front
        sendResponce({ isSuccess: true, message: 'done' })

        //send mesaage to active tab
        chrome.tabs.sendMessage(activeTabId, { message: 'message from back' })
        //set local data
        chrome.storage.local.get(value => {
            console.log('storage.local get', value)
        })
    }
    else {
        console.log('%celse onMessage.addListener', 'background:red', req, sender, sendResponce);
    }
})