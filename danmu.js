//max line of damnu
var line =10;
// var mid = 3;
//max number of danmu per line
var midu =2;
var screenLength = $(".video-player__container").width();
//var screenHeight = $(".video-player__container").height();
var pospx = { left: screenLength };
var observer = null;
var update = false;
var danmuSpeed = 0;

var danmuFeed = function () {
  let twitchDanmuFeed = document.getElementsByClassName(
    "chat-scrollable-area__message-container"
  );
  let config = { attributes: true, childList: true, subtree: true };
  let callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
            if(mutation.addedNodes.length){
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
  let danmuEmote = document.getElementsByClassName("chat-line__message");
  let danmuLength= danmuEmote.length;
  let currentDanmu="";

  //let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  let randomColor = 000000;
  // let last =danmuEmote[danmuLength-1].innerHTML;
  screenLength = $(".video-player__container").width();
  //screenHeight = $(".video-player__container").height();
  pospx = { left: screenLength };
  let danmu = [];
  if (danmuSpeed>line){
    danmuSpeed=line;
  }
  for (let j = danmuLength - danmuSpeed; j < danmuLength; j++) {
    if (danmuEmote[j]) { 
      currentDanmu = danmuEmote[j].innerHTML;
      danmu.push({ line: danmuLength - j, content: currentDanmu });
    }
     

  }


  for (let i = 0; i < danmu.length; i++) {
    //if (danmu[i]) {
      if ($(".danmu-overlay-" + danmu[i].line).length) {
 
        if ($(".danmu-overlay-" + danmu[i].line).children().length < midu) {
          $(".danmu-overlay-" + danmu[i].line).prepend(
            '<div class="danmu">' + danmu[i].content + "</div>"
          );
          if ($(".danmu").length) {
            removeUsername();
            $(".danmu-overlay-" + danmu[i].line)
              .children()
              .find("span")
              .css("color", "#" + randomColor);
          }
          // $(".danmu-overlay-" + danmu[i].line)
          // .children()
          // .find(".danmu")
          // .css("left", $(".danmu-overlay" + danmu[i].line).width());

        }
      } else {
        $(".danmu-overlay").append(
          '<div class="danmu-overlay-line danmu-overlay-' +
            danmu[i].line +
            '"><div class="danmu" >' +
            danmu[i].content +
            "</div></div>"
        );
        $(".danmu-overlay-" + danmu[i].line)
          .children()
          .find("span")
          .css("color", "#" + randomColor);

        // $(".danmu-overlay-" + danmu[i].line)
        //   .children()
        //   .find(".danmu")
        //   .css("left", $(".danmu-overlay" + danmu[i].line).width());

        removeUsername();
      }

      moveDanmu(danmu[i]);
      update = false;
      danmuSpeed=0;
    //}
  }

};

var moveDanmu = function (item) {
  let danmuTime = Math.floor(Math.random() * 5000) + 10000;
  pospx = { left: screenLength };
  if ($(".danmu-overlay-" + item.line).children().length) {
    $(".danmu-overlay-" + item.line)
      .children(".danmu")
      .each(function () {
        // console.log($("#danmu-" + item.id));
        $(this).velocity(pospx, danmuTime, "linear", function () {
          $(this).remove();
        });
      });

    //}
  }
};

// var removeDanmu = function (item) {
//   $(item).remove();
// };
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
  observer.disconnect();
  $(".danmu-overlay").remove();
  console.log("Danmu off");
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "init") {
    $(".video-player__container").prepend('<div class="danmu-overlay"></div>');
     danmuLoop = setInterval(() => {
       if(update==true){
       addListeners();
       }
     }, 1000);
    danmuFeed();
  } else {
    removeListeners();
  }
});

window.onload = function () {
  chrome.storage.sync.get("hide", function (data) {
    if (data.hide) {
      $(".video-player__container").prepend(
        '<div class="danmu-overlay"></div>'
      );
      danmuLoop = setInterval(() => {
        if(update==true){
        addListeners();
        }
      }, 1000);
      danmuFeed();
    } else {
      removeListeners();
    }
  });
};
