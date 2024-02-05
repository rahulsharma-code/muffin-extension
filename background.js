chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (tabInfo.url && tabInfo.url.includes("watir.com")) {
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      value: tabId,
    });
  }
});