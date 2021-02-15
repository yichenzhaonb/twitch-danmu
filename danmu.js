var currentDanmu= "";
var i= 10;
var danmuLen = 50;

var addListeners=function(){
    // let danmu = document.getElementsByClassName("text-fragment");
    let danmuEmote = document.getElementsByClassName("chat-line__no-background");
    if($('.danmu-overlay').length){
        $('.danmu-overlay').remove();
    }
    for (let j=danmuEmote.length-i; j<danmuEmote.length;j++){    
        if( danmuEmote[j]){
        currentDanmu = danmuEmote[j].innerHTML;
        console.log(currentDanmu);
        $(".video-player__default-player").prepend('<div class="danmu-overlay">'+ currentDanmu +'</div>');
    }
}
}


//turn off danmu
var removeListeners = function(){
     clearInterval(danmuLoop);
     $('.danmu-overlay').remove();
     console.log("Danmu off");
}
//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
    danmuLoop = setInterval(() => {
        addListeners();
    }, 1000); 
    }else{
        removeListeners();
    }

});


window.onload=function(){  
    chrome.storage.sync.get('hide', function(data) {
        if(data.hide){
            danmuLoop = setInterval(() => {
            addListeners();
            }, 1000);
        }else{
            removeListeners();
        } 
    });
}
