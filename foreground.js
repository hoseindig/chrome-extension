console.clear();
console.log("%cforeground", "background:blue");

var newsTitle = document.querySelectorAll(".ntitle a");
var newsSummary = document.querySelectorAll(".summary");
//get data from page
if (
    newsTitle &&
    newsTitle.length > 0 &&
    newsSummary &&
    newsSummary.length > 0
) {
    const a_newsTitle = Array.from(newsTitle);
    const a_newsSummary = Array.from(newsSummary);
    let newsList = [];
    a_newsTitle.map((n, i) => {
        const news = { title: n.innerText, summary: a_newsSummary[i].innerText };
        newsList.push(news);
    });
    console.log(newsList);

    //send data to backend
    chrome.runtime.sendMessage({ type: "iranjib", data: newsList }, (res) => {
        //get response
        console.log(res);
    });

    //set local data
    chrome.storage.local.set({ username: "iranjib" });


}

var digiKalaEllipsis = document.querySelectorAll(".ellipsis-2");
var digiKalaImage = document.querySelectorAll(".lazyloaded");
var digiKalaPrice = document.querySelectorAll(".line-through");

//get data from page
if (
    digiKalaEllipsis &&
    digiKalaEllipsis &&
    digiKalaImage &&
    digiKalaPrice
) {
    const a_digiKalaEllipsis = Array.from(digiKalaEllipsis);
    const a_digiKalaImage = Array.from(digiKalaImage);
    const a_digiKalaPrice = Array.from(digiKalaPrice);
    let newsList = [];
    a_digiKalaEllipsis.map((n, i) => {
        const news = {
            title: n.innerText,
            price: a_digiKalaPrice[i].innerText,
            image: a_digiKalaImage[i] ? a_digiKalaImage[i].src : null,
        };
        newsList.push(news);
    });
    console.log(newsList);

    //send data to backend
    chrome.runtime.sendMessage({ type: "digikala", data: newsList });

    //set local data
    chrome.storage.local.set({ username: "digikala" });
}






//Listener from back
chrome.runtime.onMessage.addListener((req, sender, sendResponce) => {
    console.log('addListener from back', req);
    //send data to back
})