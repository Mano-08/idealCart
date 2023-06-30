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
sidePanel.style.boxShadow = "0px 2px 7px rgba(0,0,0,0.2)";
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

function captureData() {
  const pageTitle = document.title;
  const pageUrl = window.location.href;
  const metaTags = Array.from(document.getElementsByTagName("meta"));
  let imageURL: string;

  for (const tag of metaTags) {
    if (tag.getAttribute("property") === "og:image") {
      const content = tag.getAttribute("content");
      if (content.startsWith("http://")) {
        imageURL = "";
      } else {
        imageURL = content;
      }
      break;
    }
  }
  if (imageURL === "") {
    const imgTags = Array.from(document.getElementsByTagName("img"));
    for (const imgTag of imgTags) {
      const regex = new RegExp(imgTag.alt);
      console.log(regex, imgTag.alt, pageTitle);
      if (regex.test(pageTitle)) {
        imageURL = imgTag.src;
        break;
      }
    }
  }
  return { pageTitle, pageUrl, imageURL };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "toggle-sidepanel") {
    console.log("toggle-sidepaneleqffrfrfwrf");
    toggleSidePanel();
  }
  if (request.type === "captureData") {
    const capturedData = captureData();
    sendResponse({ ...capturedData });
  }
});
