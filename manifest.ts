import packageJson from "./package.json";

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: "IdealCart - Your Shopping Partner",
  version: packageJson.version,
  description: packageJson.description,
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  icons: {
    "128": "icon-128.png",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-128.png",
  },
  host_permissions: ["*://*/*"],
  permissions: ["storage", "tabs", "scripting"],
};

export default manifest;
