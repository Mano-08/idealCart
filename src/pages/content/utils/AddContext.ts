export function createContextMenu() {
  chrome.contextMenus.create({
    id: "addToCart-idealCart",
    title: "Add to IdealCart",
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "addToCart-idealCart") {
      chrome.tabs.sendMessage(tab.id, {
        message: "addToCart-idealCart",
      });
    }
  });
}
