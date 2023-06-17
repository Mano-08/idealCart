console.log("content loaded");

// Create an iframe for SidePanel
const sidePanel = document.createElement("iframe");
sidePanel.src = chrome.runtime.getURL("src/pages/sidepanel/index.html");
sidePanel.style.borderRadius = "20px";
sidePanel.style.zIndex = "9999999999";
sidePanel.style.position = "fixed";
sidePanel.style.border = "none";
sidePanel.style.right = "-40px";
sidePanel.style.visibility = "hidden";
sidePanel.style.opacity = "0";
sidePanel.style.width = "450px";
sidePanel.style.height = "62vh";
sidePanel.style.top = "6.2px";
sidePanel.style.transition = "all 0.5s ease-in-out";
document.body.appendChild(sidePanel);

const toggleSidePanel = () => {
  if (sidePanel.style.opacity === "0") {
    sidePanel.style.visibility = "visible";
    sidePanel.style.opacity = "1";
    sidePanel.style.right = "6.2px";
  } else {
    sidePanel.style.visibility = "hidden";
    sidePanel.style.opacity = "0";
    sidePanel.style.right = "-40px";
  }
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "toggle-sidepanel") {
    console.log("toggle-sidepaneleqffrfrfwrf");
    toggleSidePanel();
  }
});
