export function captureOGImage(pageUrl: string) {
  let imageURL = "";

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

  return imageURL;
}
