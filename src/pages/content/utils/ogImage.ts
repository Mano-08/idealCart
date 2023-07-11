import { findWebsite } from "./findWebsite";

export function captureOGImage(pageUrl: string) {
  let imageURL = "";

  switch (findWebsite(pageUrl)) {
    case "amazon":
      imageURL = (document.getElementById("landingImage") as HTMLImageElement)
        ? (document.getElementById("landingImage") as HTMLImageElement).src
        : "";
      break;
    default:
      for (const tag of Array.from(document.getElementsByTagName("meta"))) {
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
  }

  return imageURL;
}
