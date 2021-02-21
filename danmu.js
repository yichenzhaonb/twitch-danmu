var currentDanmu = "";
var danmuLen = 50;
var k = 0;
var line = 10;
var mid = 5;
var midu = 1;
var screenLength = $(".video-player__container").width();
var screenHeight = $(".video-player__container").height();
var pospx = { left: screenLength };


/*To do add async array to save damnu, load danmu based on the number per seconds*/

var addListeners = function () {
  let danmuEmote = document.getElementsByClassName("chat-line__no-background");
  screenLength = $(".video-player__container").width();
  screenHeight = $(".video-player__container").height();
  pospx = { left: screenLength };
  let danmu = [];
  for (let j = danmuEmote.length - line; j < danmuEmote.length; j++) {
    if (danmuEmote[j]) {
      currentDanmu = danmuEmote[j].innerHTML;
      // console.log(currentDanmu);
      danmu.push({ id: k, line: danmuEmote.length - j, content: currentDanmu });
    }
    k++;
  }

  for(let i =0; i<line-5; i++){
     if(danmu[i]){
      if($('.danmu-overlay-'+danmu[i].line).length){
          if($('.danmu-overlay-'+danmu[i].line).children().length <midu){
              $('.danmu-overlay-'+danmu[i].line).prepend('<div id="danmu-'+danmu[i].id+'" class="danmu">'+  danmu[i].content +'</div>');
              if($('.danmu').length){
                removeUsername();
              }

          }
      }
      else{
      $(".danmu-overlay").prepend('<div class="danmu-overlay-line danmu-overlay-'+danmu[i].line+ '"><div class="danmu" id="danmu-'+danmu[i].id+'" >'+  danmu[i].content +'</div></div>');
      removeUsername();
     }

      moveDanmu(danmu[i]);
     }
  }

   if( $(".danmu-overlay-mid").length){
    $(".danmu-overlay-mid").remove();
   }

  for (let m = 5; m < line; m++) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (danmu[m]) {
      if ($(".danmu-overlay-mid").length) {
        if ($(".danmu-overlay-mid").children().length < 5) {
          $(".danmu-overlay-mid").prepend(
            '<div id="danmu-' +
              danmu[m].id +
              '" class="danmu">' +
              danmu[m].content +
              "</div>"
          );
          $("#danmu-" + danmu[m].id)
            .find("span")
            .css("color", "#" + randomColor);
          console.log(randomColor);
          if ($(".danmu").length) {
            removeUsername();
          }
        }
      } else {
        $(".danmu-overlay").append(
          '<div class="danmu-overlay-mid"><div class="danmu" id="danmu-' +
            danmu[m].id +
            '" >' +
            danmu[m].content +
            "</div></div>"
        );
        $("#danmu-" + danmu[m].id)
          .find("span")
          .css("color", "#" + randomColor);
        removeUsername();
      }
    }
  }

};

var moveDanmu = function (item) {
  //for(let i=0; i<item.length;i++){
  let danmuTime = Math.floor(Math.random() * 5000) + 5000;
  $("#danmu-" + item.id).animate(pospx, danmuTime, "linear", function () {
    removeDanmu(item);
  });
  //}
};

var removeDanmu = function (item) {
  $("#danmu-" + item.id).remove();
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
  $(".danmu-overlay").remove();
  console.log("Danmu off");
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "init") {
    $(".video-player__container").prepend('<div class="danmu-overlay"></div>');
    danmuLoop = setInterval(() => {
      addListeners();
    }, 1000);

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
        addListeners();
      }, 1000);
    } else {
      removeListeners();
    }
  });
};
