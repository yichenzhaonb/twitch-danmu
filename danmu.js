var currentDanmu= "";
var i = 0;

// let elem = document.createElement('div');
// elem.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000';
// document.getElementsByClassName("video-player__overlay").appendChild(elem);
//turn on danmu
var addListeners=function(){
    let danmu = document.getElementsByClassName("text-fragment");
    let twitch = document.getElementsByClassName("video-player__overlay");
console.log( twitch);
console.log( document.getElementsByClassName("video-player__overlay"));
   // for (i=0; i<danmu.length;i++){    
    //danmuArr.push(danmu[0].textContent,new Date().getTime());  
    //}
    document.getElementsByClassName("video-player__overlay").style.backgroundColor = "lightblue";
    if(danmu[i]){
        currentDanmu = danmu[i].textContent;
        console.log(currentDanmu);
        twitch.innerHTML += '<div class="danmu-overlay">'+ currentDanmu +'</div>';
        i++;
    }
 
}

//turn off danmu
var removeListeners = function(){
     console.log("Danmu off");
}
//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
    //     setInterval(() => {
    //     addListeners();
    // }, 500); 
    addListeners();
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});
