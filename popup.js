// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

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
        chrome.tabs.sendMessage(tabs[0].id, {command: "init", hide: value});
      });

   }else{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "remove", hide: value});
      });

   }

 };

// console.log(danmu);