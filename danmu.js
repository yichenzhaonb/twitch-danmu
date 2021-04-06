//max line of damnu
var line = 5;
var Speedlimit = 10;
// var mid = 3;
//max number of danmu per line
var midu =2;
var interval = 5000;
var randomColor = 000000;

var screenLength = $(".video-player__container").width();
//var screenHeight = $(".video-player__container").height();
var pospx ={transform: "translateX("+screenLength+"px)" };
var update = false;
var danmuSpeed = 0;
var danmu=[];
var observer = null;
var danmuLoop= null;


var danmuFeed = function () {
  let twitchDanmuFeed = document.getElementsByClassName(
    "chat-scrollable-area__message-container"
  );
 
  let config = { childList: true};
  let callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
            if(mutation.addedNodes.length){
              update = true;
              if (danmuSpeed>=Speedlimit){
                danmu=[]; 
                danmuSpeed=0; 
                update = false; 
                }
              else{
                danmu.push({ content: mutation.addedNodes[0].innerHTML});
                danmuSpeed++;  
              } 
            }else{
                update = false; 
            }
         
      }
    }   
  };
  observer = new MutationObserver(callback);
  observer.observe(twitchDanmuFeed[0], config);
};

var addListeners = function () {
  //console.log("listening on the twitch");
 
  screenLength = $(".video-player__container").width();
  for (let i = 0; i < line; i++) {
    //if (danmu[i]) {
      if ($(".danmu-overlay-" + i).length ==0) {
        $(".danmu-overlay").append(
          '<div class="danmu-overlay-line danmu-overlay-' +
            i + '"></div>');

      }
  }
  $(".danmu-overlay-line") .css({height:50/line+"%"});

  if(update==true){
  for (let i = 0; i < danmu.length; i++) {
      if ($(".danmu-overlay-" + i).length) {
        if ($(".danmu-overlay-" +i).children().length <midu) {
          $(".danmu-overlay-" + i) .css({left: screenLength});
          $(".danmu-overlay-" + i).prepend(
            '<div class="danmu">' + danmu[i].content + "</div>"
          );
          
          if ($(".danmu").length) {
            // $(".danmu").offset({ left: 0});
            removeUsername();
            $(".danmu-overlay-" + i)
              .children()
              .find("span")
              .css("color", "#" + randomColor);
          } 
          moveDanmu(i);
        }
      } 
    
   }
   //console.log(danmu);

  }
 
};

var moveDanmu = function (item) {
let danmuTime = Math.floor(Math.random() * 5000) + 5000;
if ($(".danmu-overlay-" + item).children().length) {
    $(".danmu-overlay-" + item)
      .children(".danmu")
      .each(function () {
        let travel= $.trim($(this).html()).length +screenLength;
        $(this).velocity(
          {
            transform: "translateX(-"+ travel +"px)",
          },
          {
          duration:danmuTime, 
          easing:"linear",
          complete: function () {
         // console.log($(this));
          if($(this).length){
          $(this).remove();
          }
          }
        }
        );
  
      });
  }
};


var removeUsername = function () {
  $(".danmu").find(".chat-line__username-container").remove();
  $(".danmu")
    .find('span[data-test-selector="chat-message-separator"]')
    .remove();
  
};

function resetDanmu(){
  removeDanmu();
  $(".video-player__container").prepend('<div class="danmu-overlay"></div>');
  danmuFeed();
  danmuLoop = setInterval(() => {
     addListeners();
   }, interval );
   chrome.storage.sync.set({'danmuOn': 1}, function() {
    //console.log('The value is'+ 1);
  });
}

function startDanmu(){
  $(".video-player__container").prepend('<div class="danmu-overlay"></div>');
    danmuFeed();
    danmuLoop = setInterval(() => {
       addListeners();
     }, interval );
   chrome.storage.sync.set({'danmuOn': 1}, function() {
     // console.log('The value is'+ 1);
    });
}


//turn off danmu
var removeDanmu = function () {
  if (danmuLoop) {
    clearInterval(danmuLoop);
  }
  if(observer){
  observer.disconnect();
  }
  $(".danmu-overlay").remove();
  chrome.storage.sync.set({'danmuOn': 0}, function() {
    //console.log('The value is'+ 0);
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "init") {
    startDanmu();
    console.log("Danmu start");
  }
  if (request.command === "remove" || request.message=="suspend") {
    removeDanmu();
    console.log("Danmu off");
  }
  if (request.message === 'changeTab') {
    resetDanmu();
    console.log("Danmu reset change url");
  }
  if (request.message === 'activateTab') {
    resetDanmu();
    console.log("Danmu reset activate tab");
  }
  if (request.message === 'notMinimized') {
    // resetDanmu();
    // console.log("Danmu reset minimized window activate");
  }

});

$( document).ready(function() {
  chrome.storage.sync.get("danmuOn", function (data) {
    if (data.danmuOn) {
      startDanmu();
    } else {
      removeDanmu();
    }
  });
});


