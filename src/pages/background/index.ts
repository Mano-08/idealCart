chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchOGImage") {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        func: fetchOGImageFromPage,
      },
      (results) => {
        if (results && results[0].result) {
          console.log(results);
          sendResponse({ imageURL: results[0].result });
        } else {
          console.log(results, "INSDIE NIULL");

          sendResponse({ imageURL: "" });
        }
      }
    );
    return true; // Keep the message channel open for sendResponse
  }
});

function fetchOGImageFromPage() {
  const ogImageTag = document.querySelector('meta[property="og:image"]');
  return ogImageTag ? ogImageTag.getAttribute("content") : null;
}
