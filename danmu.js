//max line of damnu
var line = 4;
// var mid = 3;
//max number of danmu per line
var midu =2;
var screenLength = $(".video-player__container").width();
//var screenHeight = $(".video-player__container").height();
var pospx ={transform: "translateX("+screenLength+"px)" };
var update = false;
var danmuSpeed = 0;
var danmu=[];
var observer = null;

var danmuFeed = function () {

  let twitchDanmuFeed = document.getElementsByClassName(
    "chat-scrollable-area__message-container"
  );
  let config = { attributes: true, childList: true, subtree: true };
  let callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
            if(mutation.addedNodes.length){
              if (danmuSpeed>line){
                danmuSpeed=line;
                }
              danmu.push({ content: mutation.addedNodes[0].innerHTML });
              danmuSpeed++;   
            }
       
        update = true;
       
      }
    }
    
  };

  observer = new MutationObserver(callback);
  observer.observe(twitchDanmuFeed[0], config);

};


var addListeners = function () {
  let randomColor = 000000;
  screenLength = $(".video-player__container").width();
  for (let i = 0; i < danmuSpeed; i++) {
    //if (danmu[i]) {
      if ($(".danmu-overlay-" + i).length ==0) {
        $(".danmu-overlay").append(
          '<div class="danmu-overlay-line danmu-overlay-' +
            i + '"></div>');
      }

  }
  if(update==true){
  for (let i = 0; i < danmu.length; i++) {
      if ($(".danmu-overlay-" + i).length) {
        if ($(".danmu-overlay-" +i).children().length < midu) {
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

        }
      } 
      moveDanmu(i);
  }
  }
  update = false;
  danmu=[];
  danmuSpeed=0;
};

var moveDanmu = function (item) {
  let danmuTime = Math.floor(Math.random() * 5000) + 5000;
  // screenLength= screenLength - $(this).position().left;
  // console.log( screenLength);
  pospx = {transform: "translateX("+screenLength+"px)" };
 
  if ($(".danmu-overlay-" + item).children().length) {
    $(".danmu-overlay-" + item)
      .children(".danmu")
      .each(function () {
        $(this).velocity(pospx,
          danmuTime, 
         "linear",function () {
          $(this).remove();
        });
  
      });
  }
};


var removeUsername = function () {
  $(".danmu").find(".chat-line__username-container").remove();
  $(".danmu")
    .find('span[data-test-selector="chat-message-separator"]')
    .remove();
  
};

//turn off danmu
var removeListeners = function () {
  if (danmuLoop) {
    clearInterval(danmuLoop);
  }
  if(observer){
  observer.disconnect();
  }

  $(".danmu-overlay").remove();
  console.log("Danmu off");
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "init") {
    $(".video-player__container").prepend('<div class="danmu-overlay"></div>');
    danmuFeed();
     danmuLoop = setInterval(() => {
       addListeners();
     }, 5000);
 
  } else {
    removeListeners();
  }
});

$( document ).ready(function() {
  chrome.storage.sync.get("hide", function (data) {
    if (data.hide) {
      $(".video-player__container").prepend(
        '<div class="danmu-overlay"></div>'
      );
      danmuFeed();
      danmuLoop = setInterval(() => {
        addListeners();
      }, 5000);
    } else {
      removeListeners();
    }
  });
});
