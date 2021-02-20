var currentDanmu= "";
var danmuLen = 50;
var k=0;
var line = 5;
var screenLength=$(".video-player__container").width();
var pospx = {'left' : screenLength};
var midu = 1;

$(".video-player__container").prepend('<div class="danmu-overlay"></div>');

var addListeners=function(){
    let danmuEmote = document.getElementsByClassName("chat-line__no-background");
    screenLength= $(".video-player__container").width();
    pospx = {'left' : screenLength};
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
       if(danmu[i]){
        if($('.danmu-overlay-'+danmu[i].line).length){
            if($('.danmu-overlay-'+danmu[i].line).children().length <midu){
                $('.danmu-overlay-'+danmu[i].line).prepend('<div id="danmu-'+danmu[i].id+'" class="danmu">'+  danmu[i].content +'</div>');
            }
        }
        else{
        $(".danmu-overlay").prepend('<div class="danmu-overlay-line danmu-overlay-'+danmu[i].line+ '"><div class="danmu" id="danmu-'+danmu[i].id+'" >'+  danmu[i].content +'</div></div>');
        }
       
        moveDanmu(danmu[i]);
        }
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
    if(danmuLoop){
     clearInterval(danmuLoop);
    }
     $('.danmu-overlay').remove();
     console.log("Danmu off");

    }


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
