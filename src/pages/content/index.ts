// import { createContextMenu } from "./utils/AddContext";
import { captureOGImage } from "./utils/ogImage";

// Create an iframe for SidePanel
const sidePanel = document.createElement("iframe");
sidePanel.src = chrome.runtime.getURL("src/pages/sidepanel/index.html");
sidePanel.classList.add("sidepanelIdealCart");
sidePanel.style.visibility = "hidden";
sidePanel.style.opacity = "0";
sidePanel.style.right = "-40px";
sidePanel.style.height = "30rem"; // User should be able to adjust HEIGHT in settings page
sidePanel.style.width = "28rem"; // User should be able to adjust WIDTH in settings page

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

function captureData() {
  const pageTitle = document.title;
  const pageURL = window.location.href;
  const imageURL = captureOGImage(pageURL);
  return { pageTitle, pageURL, imageURL };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "toggle-sidepanel") {
    toggleSidePanel();
  }
  if (request.message === "addToCart-idealCart") {
    sidePanel.style.visibility = "visible";
    sidePanel.style.opacity = "1";
    sidePanel.style.right = "6.2px";
    const capturedData = captureData();
    chrome.runtime.sendMessage({
      message: "addToCart-Data",
      data: capturedData,
    });
  }
  if (request.type === "captureData") {
    const capturedData = captureData();
    sendResponse({ ...capturedData });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const handleClickOutside = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (!sidePanel.contains(targetElement)) {
      sidePanel.style.visibility = "hidden";
      sidePanel.style.opacity = "0";
      sidePanel.style.right = "-40px";
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
});

// createContextMenu();
