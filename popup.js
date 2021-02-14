// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//     chrome.tabs.executeScript(
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
// };

 let danmuOption = document.getElementById('showDanmu');

 chrome.storage.sync.get('hide', function(data) {
    danmuOption.checked=data.hide;
  });


 danmuOption.onchange = function(e){
   let value = this.checked;

  chrome.storage.sync.set({'hide': value}, function() {
    console.log('The value is'+ value);
  });


   if(value){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "init", hide: value}, function(response) {
                      //console.log(response.result);
                  });
      });

   }else{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "remove", hide: value}, function(response) {
                    // console.log(response.result);
        });
      });

   }


 };

// console.log(danmu);