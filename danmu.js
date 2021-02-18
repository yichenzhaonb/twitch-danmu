var currentDanmu= "";
var danmuLen = 50;
var k=0;
var line = 5;
var screenLength=$(".video-player__default-player").width();
var pospx = {'left' : screenLength};

var addListeners=function(){
    // let danmu = document.getElementsByClassName("text-fragment");
    let danmuEmote = document.getElementsByClassName("chat-line__no-background");
    // if($('.danmu-overlay').length){
    //     $('.danmu-overlay').remove();
    // }
    let danmu =[];
    for (let j=danmuEmote.length-line; j<danmuEmote.length;j++){    
        if( danmuEmote[j]){
        currentDanmu = danmuEmote[j].innerHTML;
       // console.log(currentDanmu);
        danmu.push({id:k,line:danmuEmote.length-j,content:currentDanmu});
        }
        k++;
     }

    for(let i =0; i<line; i++){
        console.log(danmu[i]);
        if($('.danmu-overlay-'+danmu[i].line).length){
            $('.danmu-overlay-'+danmu[i].line).prepend('<div id="danmu-'+danmu[i].id+'" class="danmu">'+  danmu[i].content +'</div>');
        }else{
        $(".video-player__default-player").prepend('<div class="danmu-overlay danmu-overlay-'+danmu[i].line+ '"><div class="danmu" id="danmu-'+danmu[i].id+'" >'+  danmu[i].content +'</div></div>');
        }
        moveDanmu(danmu[i]);
    }
    
    
    
   }
   

var moveDanmu = function(item){
    //for(let i=0; i<item.length;i++){
    let danmuTime =Math.floor(Math.random() * 5000) + 5000;
    $( "#danmu-"+item.id ).animate( pospx, danmuTime, 'linear',function(){removeDanmu(item)});
    //}
}

var removeDanmu = function(item){
    $( "#danmu-"+item.id).remove();
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
    }, 2000); 
    }else{
        removeListeners();
    }

});

window.onload=function(){  
    chrome.storage.sync.get('hide', function(data) {
        if(data.hide){
            danmuLoop = setInterval(() => {
            addListeners();
            }, 2000);
        }else{
            removeListeners();
        } 
    });
}
