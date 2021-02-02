

//turn on danmu
var addListeners=function(){

    console.log("Danmu on");
}

//turn off danmu
var removeListeners = function(){

     console.log("Danmu off");
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
        addListeners();
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

