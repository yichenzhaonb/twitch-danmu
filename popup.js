// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

 let danmuOption = document.getElementById('showDanmu');

 danmuOption.onchange = function(e){
   let value = this.checked;
   if(value){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "init", hide: value}, function(response) {
                      console.log(response.result);   
                 });
      });


   }else{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "remove", hide: value}, function(response) {
                    console.log(response);
        });
      });

   }

 };

// console.log(danmu);