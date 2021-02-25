var currentDanmu = "";
var danmuLen = 50;
// var k = 0;
var line = 5;
var mid = 5;
var midu = 1;
var screenLength = $(".video-player__container").width();
var screenHeight = $(".video-player__container").height();
var pospx = { left: screenLength };
var observer = null;
var transformed = false;
var animeId = null;
// var totalDanmu =0;

/*To do add async array to save damnu, load danmu based on the number per seconds*/
var danmuFeed = function () {
  let twitchDanmuFeed = document.getElementsByClassName(
    "chat-scrollable-area__message-container"
  );
  twitchDanmuFeedLength = document.getElementsByClassName(
    "chat-scrollable-area__message-container"
  )[0].childElementCount;
  let config = { attributes: true, childList: true, subtree: true };
  let callback = function (mutationsList, observer) {
    // totalDanmu = totalDanmu + mutationsList.length;
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        twitchDanmuFeedLength = document.getElementsByClassName(
          "chat-scrollable-area__message-container"
        )[0].childElementCount;
        // console.log(twitchDanmuFeedLength);
        //console.log(mutation);
        addListeners();
      }
    }
  };
  observer = new MutationObserver(callback);
  observer.observe(twitchDanmuFeed[0], config);
};

// var readDanmu = function(){
//   let danmuEmote = document.getElementsByClassName("chat-line__no-background");

//   let danmu = [];
//   if (danmuEmote.length < midu){
//     midu = danmuEmote.length;
//   }

//   for (let i = 0; i <  midu; i++) {
//     if (danmuEmote[i]) {
//       currentDanmu = danmuEmote[j].innerHTML;
//       // console.log(currentDanmu);
//       danmu.push({ id: i, content: currentDanmu });
//     }

//   }
// return new Promise(resolve=>{
//   danmuFeed = setInterval(() => {
//   }, 1000);

// });
// }

var addListeners = function () {
  let danmuEmote = document.getElementsByClassName("chat-line__no-background");
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  screenLength = $(".video-player__container").width();
  screenHeight = $(".video-player__container").height();
  pospx = { left: screenLength };
  let danmu = [];
  for (let j = danmuEmote.length - line; j < danmuEmote.length; j++) {
    if (danmuEmote[j]) {
      currentDanmu = danmuEmote[j].innerHTML;
      // console.log(currentDanmu);
      danmu.push({ line: danmuEmote.length - j, content: currentDanmu });
    }
    // k++;
  }

  for (let i = 0; i < line; i++) {
    if (danmu[i]) {
      if ($(".danmu-overlay-" + danmu[i].line).length) {
        // let children = document.getElementById('.danmu-overlay-'+danmu[i].line).children;
        // let totalWidth = 0;
        // for (let i = 0; i < children.length; i++) {
        //     totalWidth += children[i].offsetWidth;
        // }
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
        $(".danmu-overlay").prepend(
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
    }
  }

  //    if( $(".danmu-overlay-mid").length){
  //     $(".danmu-overlay-mid").remove();
  //    }

  //   for (let m = 5; m < line; m++) {
  //     let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //     if (danmu[m]) {
  //       if ($(".danmu-overlay-mid").length) {
  //         if ($(".danmu-overlay-mid").children().length < 5) {
  //           $(".danmu-overlay-mid").prepend(
  //             '<div id="danmu-' +
  //               danmu[m].id +
  //               '" class="danmu">' +
  //               danmu[m].content +
  //               "</div>"
  //           );
  //           $("#danmu-" + danmu[m].id)
  //             .find("span")
  //             .css("color", "#" + randomColor);
  //           // console.log(randomColor);
  //           if ($(".danmu").length) {
  //             removeUsername();
  //           }
  //         }
  //       } else {
  //         $(".danmu-overlay").append(
  //           '<div class="danmu-overlay-mid"><div class="danmu" id="danmu-' +
  //             danmu[m].id +
  //             '" >' +
  //             danmu[m].content +
  //             "</div></div>"
  //         );
  //         $("#danmu-" + danmu[m].id)
  //           .find("span")
  //           .css("color", "#" + randomColor);
  //         removeUsername();
  //       }
  //     }
  //   }
};

var moveDanmu = function (item) {
  //   let start=null;
  let danmuTime = Math.floor(Math.random() * 5000) + 5000;
  //   let speed = Math.floor(Math.random() * 4) + 4;
  //   let element = document.getElementById("danmu-"+item.id);

  //   if(element){
  //     //element.style.position = 'absolute';
  //   function step(timestamp) {
  //     if (!start) start = timestamp;
  //     let progress = timestamp - start;
  //     screenLength = $(".video-player__container").width();
  //     element.style.left = Math.min(progress / speed, screenLength+100) + 'px';
  //     if (progress < danmuTime) {
  //       window.requestAnimationFrame(step);
  //     }else{
  //       removeDanmu(item);
  //       // cancelAnimationFrame(move);
  //     }
  //   }
  // window.requestAnimationFrame(step);
  // }
  // animeId = window.requestAnimationFrame(() => {
  //   if (cntr < cntnrWidth - 70) {
  //     elemToMove.style.left = cntr + "px";
  //     cntr += 2;
  //     if (transformed) {
  //       elemToMove.style.transform = "none";
  //       transformed = false;
  //     }
  //   } else {
  //     if (!transformed) {
  //       elemToMove.style.transform = "scaleX(-1)";
  //       transformed = true;
  //     }
  //     let cntrLeft = parseInt(elemToMove.style.left.split("px")[0]);
  //     if (cntrLeft <= 3) {
  //       cntr = 5;
  //     }
  //     elemToMove.style.left = cntrLeft - 2 + "px";
  //   }
  // });

  //for(let i=0; i<item.length;i++){

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
  // if (danmuLoop) {
  //   clearInterval(danmuLoop);
  // }
  observer.disconnect();
  $(".danmu-overlay").remove();
  console.log("Danmu off");
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "init") {
    $(".video-player__container").prepend('<div class="danmu-overlay"></div>');
    //  danmuLoop = setInterval(() => {
    //   //  addListeners();
    //  }, 1000);
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
      // danmuLoop = setInterval(() => {

      //   //addListeners();
      // }, 1000);
      danmuFeed();
    } else {
      removeListeners();
    }
  });
};
