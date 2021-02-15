var currentDanmu= "";
if( $('.video-player').length){
    $('.video-player').prepend('<div id="danmu-overlay"></div>');
}

//document.getElementsByClassName("video-player__overlay").style.backgroundColor = "lightblue";
// let elem = document.createElement('div');
// elem.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000';
// document.getElementsByClassName("video-player__overlay").appendChild(elem);
//turn on danmu 
var addListeners=function(){
    let danmu = document.getElementsByClassName("text-fragment");
    //console.log(twitch);
   // for (i=0; i<danmu.length;i++){    
    //danmuArr.push(danmu[0].textContent,new Date().getTime());  
    currentDanmu = danmu[danmu.length-1].textContent;
    console.log(currentDanmu);
    document.getElementById("danmu-overlay").innerHTML = currentDanmu;
    
    
 
}
//turn off danmu
var removeListeners = function(){
     console.log("Danmu off");
}
//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
        setInterval(() => {
        addListeners();
    }, 1000); 
    sendResponse({result: "success"});
    }else{
        removeListeners();
    }
    
});
