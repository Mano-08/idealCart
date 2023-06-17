console.log("background loaded");

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { message: "toggle-sidepanel" });
});
