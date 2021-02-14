
   
//turn on danmu
var addListeners=function(){
    let danmu = document.getElementsByClassName("text-fragment");
    let danmuArr = [];
   // for (i=0; i<danmu.length;i++){    
    danmuArr.push(danmu[0].textContent);  
    //}
    console.log(danmuArr);

   // console.log("Danmu on");
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
    }, 5000); 

    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});
