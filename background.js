// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.twitch.tv'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
    if (tab.active && changeInfo.url) {
      console.log("back to tab");
      chrome.tabs.sendMessage( tabId, {
        message: 'changeTab',
        url: changeInfo.url
      })
    }
  }
);

chrome.tabs.onActivated.addListener( function(activeInfo){
  chrome.tabs.get(activeInfo.tabId, function(tab){
    chrome.tabs.sendMessage( activeInfo.tabId, {
      message: 'activateTab',
      tabid: activeInfo.tabId
    })
  });
});


chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (windowId === -1) {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function (tabs) {
      // Do something with tabs
      chrome.tabs.sendMessage(tabs[0].id, {
        message: 'minimized'
      })
  });
  } else {
      chrome.windows.get(windowId, function(chromeWindow) {
          if (chromeWindow.state === "minimized") {
            chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function (tabs) {
              // Do something with tabs   
              chrome.tabs.sendMessage(tabs[0].id, {
                message: 'minimized'
              })
          });
          } else {
            chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function (tabs) {
              // Do something with tabs
              chrome.tabs.sendMessage(tabs[0].id, {
                message: 'notMinimized'
              })
          });
          }
      });
  }
});


chrome.runtime.onSuspend.addListener(function() {
  console.log("Unloading.");
  chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function (tabs) {
    // Do something with tabs
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'suspend'
    })
});
});