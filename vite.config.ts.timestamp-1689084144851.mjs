// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3, { resolve as resolve3 } from "path";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// utils/manifest-parser/index.ts
var ManifestParser = class {
  constructor() {
  }
  static convertManifestToString(manifest2) {
    return JSON.stringify(manifest2, null, 2);
  }
};
var manifest_parser_default = ManifestParser;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname = "D:\\github\\idealCart\\idealCart.2.0\\utils\\plugins";
var { resolve } = path;
var distDir = resolve(__vite_injected_original_dirname, "..", "..", "dist");
var publicDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function makeManifest(manifest2, config) {
  function makeManifest2(to) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const manifestPath = resolve(to, "manifest.json");
    if (config.contentScriptCssKey) {
      manifest2.content_scripts.forEach((script) => {
        script.css = script.css.map(
          (css) => css.replace("<KEY>", config.contentScriptCssKey)
        );
      });
    }
    fs.writeFileSync(
      manifestPath,
      manifest_parser_default.convertManifestToString(manifest2)
    );
    colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
  }
  return {
    name: "make-manifest",
    buildStart() {
      if (config.isDev) {
        makeManifest2(distDir);
      }
    },
    buildEnd() {
      if (config.isDev) {
        return;
      }
      makeManifest2(publicDir);
    }
  };
}

// utils/plugins/custom-dynamic-import.ts
function customDynamicImport() {
  return {
    name: "custom-dynamic-import",
    renderDynamicImport() {
      return {
        left: `
        {
          const dynamicImport = (path) => import(path);
          dynamicImport(
          `,
        right: ")}"
      };
    }
  };
}

// utils/plugins/add-hmr.ts
import * as path2 from "path";
import { readFileSync } from "fs";
var __vite_injected_original_dirname2 = "D:\\github\\idealCart\\idealCart.2.0\\utils\\plugins";
var isDev = process.env.__DEV__ === "true";
var DUMMY_CODE = `export default function(){};`;
function getInjectionCode(fileName) {
  return readFileSync(
    path2.resolve(__vite_injected_original_dirname2, "..", "reload", "injections", fileName),
    { encoding: "utf8" }
  );
}
function addHmr(config) {
  const { background = false, view = true } = config || {};
  const idInBackgroundScript = "virtual:reload-on-update-in-background-script";
  const idInView = "virtual:reload-on-update-in-view";
  const scriptHmrCode = isDev ? getInjectionCode("script.js") : DUMMY_CODE;
  const viewHmrCode = isDev ? getInjectionCode("view.js") : DUMMY_CODE;
  return {
    name: "add-hmr",
    resolveId(id) {
      if (id === idInBackgroundScript || id === idInView) {
        return getResolvedId(id);
      }
    },
    load(id) {
      if (id === getResolvedId(idInBackgroundScript)) {
        return background ? scriptHmrCode : DUMMY_CODE;
      }
      if (id === getResolvedId(idInView)) {
        return view ? viewHmrCode : DUMMY_CODE;
      }
    }
  };
}
function getResolvedId(id) {
  return "\0" + id;
}

// package.json
var package_default = {
  name: "idealcart",
  version: "1.0.0",
  description: "Embark on a shopping adventure across a multitude of websites yet effortlessly manage them all in your idealCart",
  license: "MIT",
  scripts: {
    build: "tsc --noEmit && vite build",
    "build:watch": "cross-env __DEV__=true vite build --watch",
    "build:hmr": "rollup --config utils/reload/rollup.config.ts",
    wss: "node utils/reload/initReloadServer.js",
    dev: "npm run build:hmr && (run-p wss build:watch)",
    test: "jest"
  },
  type: "module",
  dependencies: {
    "@dnd-kit/core": "^6.0.8",
    "@dnd-kit/sortable": "^7.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "async-lock": "^1.4.0",
    googlebard: "^1.0.6",
    "node-fetch": "^3.3.1",
    react: "18.2.0",
    "react-dom": "18.2.0",
    "react-hot-toast": "^2.4.1"
  },
  devDependencies: {
    "@radix-ui/colors": "^0.1.8",
    "@rollup/plugin-typescript": "^8.5.0",
    "@testing-library/react": "13.4.0",
    "@types/async-lock": "^1.4.0",
    "@types/chrome": "0.0.224",
    "@types/jest": "29.0.3",
    "@types/node": "18.15.11",
    "@types/react": "18.0.21",
    "@types/react-beautiful-dnd": "^13.1.4",
    "@types/react-dom": "18.2.4",
    "@types/tailwindcss": "^3.1.0",
    "@types/ws": "^8.5.4",
    "@typescript-eslint/eslint-plugin": "5.56.0",
    "@typescript-eslint/parser": "5.38.1",
    "@vitejs/plugin-react": "2.2.0",
    autoprefixer: "^10.4.14",
    chokidar: "^3.5.3",
    "cross-env": "^7.0.3",
    eslint: "8.36.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-react": "7.32.2",
    "fs-extra": "11.1.0",
    jest: "29.0.3",
    "jest-environment-jsdom": "29.5.0",
    "npm-run-all": "^4.1.5",
    prettier: "2.8.8",
    rollup: "2.79.1",
    sass: "1.62.1",
    tailwindcss: "^3.3.2",
    "ts-jest": "29.0.2",
    "ts-loader": "9.4.2",
    typescript: "4.8.3",
    vite: "3.1.3",
    ws: "8.13.0"
  }
};

// manifest.ts
var manifest = {
  manifest_version: 3,
  name: "idealCart",
  version: package_default.version,
  description: package_default.description,
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module"
  },
  icons: {
    "128": "icon-128.png"
  },
  action: {
    default_icon: "icon-128.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle<KEY>.chunk.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  permissions: ["storage", "activeTab", "tabs"],
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "src/pages/*/*.html",
        "src/pages/*/*.js",
        "icon-128.png",
        "icon-34.png"
      ],
      matches: ["*://*/*"]
    }
  ]
};
var manifest_default = manifest;

// vite.config.ts
var __vite_injected_original_dirname3 = "D:\\github\\idealCart\\idealCart.2.0";
var root = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir = resolve3(__vite_injected_original_dirname3, "dist");
var publicDir2 = resolve3(__vite_injected_original_dirname3, "public");
var isDev2 = process.env.__DEV__ === "true";
var isProduction = !isDev2;
var enableHmrInBackgroundScript = true;
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    makeManifest(manifest_default, {
      isDev: isDev2,
      contentScriptCssKey: regenerateCacheInvalidationKey()
    }),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true })
  ],
  publicDir: publicDir2,
  build: {
    outDir,
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        content: resolve3(pagesDir, "content", "index.ts"),
        background: resolve3(pagesDir, "background", "index.ts"),
        options: resolve3(pagesDir, "options", "index.html"),
        contentStyle: resolve3(pagesDir, "content", "style.scss"),
        sidepanel: resolve3(pagesDir, "sidepanel", "index.html")
      },
      watch: {
        include: ["src/**", "vite.config.ts"],
        exclude: ["node_modules/**", "src/**/*.spec.ts"]
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev2 ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path3.parse(assetInfo.name);
          const assetFolder = dir.split("/").at(-1);
          const name = assetFolder + firstUpperCase(_name);
          if (name === "contentStyle") {
            return `assets/css/contentStyle${cacheInvalidationKey}.chunk.css`;
          }
          return `assets/[ext]/${name}.chunk.[ext]`;
        }
      }
    }
  }
});
function firstUpperCase(str) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
var cacheInvalidationKey = generateKey();
function regenerateCacheInvalidationKey() {
  cacheInvalidationKey = generateKey();
  return cacheInvalidationKey;
}
function generateKey() {
  return `${(Date.now() / 100).toFixed()}`;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJ1dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHMiLCAidXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHMiLCAidXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzIiwgIm1hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXGlkZWFsQ2FydFxcXFxpZGVhbENhcnQuMi4wXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcaWRlYWxDYXJ0XFxcXGlkZWFsQ2FydC4yLjBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdGh1Yi9pZGVhbENhcnQvaWRlYWxDYXJ0LjIuMC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBtYWtlTWFuaWZlc3QgZnJvbSBcIi4vdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0XCI7XHJcbmltcG9ydCBjdXN0b21EeW5hbWljSW1wb3J0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvY3VzdG9tLWR5bmFtaWMtaW1wb3J0XCI7XHJcbmltcG9ydCBhZGRIbXIgZnJvbSBcIi4vdXRpbHMvcGx1Z2lucy9hZGQtaG1yXCI7XHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdFwiO1xyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcclxuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XHJcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcImRpc3RcIik7XHJcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcInB1YmxpY1wiKTtcclxuXHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gXCJ0cnVlXCI7XHJcbmNvbnN0IGlzUHJvZHVjdGlvbiA9ICFpc0RldjtcclxuXHJcbi8vIEVOQUJMRSBITVIgSU4gQkFDS0dST1VORCBTQ1JJUFRcclxuY29uc3QgZW5hYmxlSG1ySW5CYWNrZ3JvdW5kU2NyaXB0ID0gdHJ1ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAc3JjXCI6IHJvb3QsXHJcbiAgICAgIFwiQGFzc2V0c1wiOiBhc3NldHNEaXIsXHJcbiAgICAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBtYWtlTWFuaWZlc3QobWFuaWZlc3QsIHtcclxuICAgICAgaXNEZXYsXHJcbiAgICAgIGNvbnRlbnRTY3JpcHRDc3NLZXk6IHJlZ2VuZXJhdGVDYWNoZUludmFsaWRhdGlvbktleSgpLFxyXG4gICAgfSksXHJcbiAgICBjdXN0b21EeW5hbWljSW1wb3J0KCksXHJcbiAgICBhZGRIbXIoeyBiYWNrZ3JvdW5kOiBlbmFibGVIbXJJbkJhY2tncm91bmRTY3JpcHQsIHZpZXc6IHRydWUgfSksXHJcbiAgXSxcclxuICBwdWJsaWNEaXIsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcixcclxuICAgIC8qKiBDYW4gc2xvd0Rvd24gYnVpbGQgc3BlZWQuICovXHJcbiAgICAvLyBzb3VyY2VtYXA6IGlzRGV2LFxyXG4gICAgbWluaWZ5OiBpc1Byb2R1Y3Rpb24sXHJcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogaXNQcm9kdWN0aW9uLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBpbnB1dDoge1xyXG4gICAgICAgIGRldnRvb2xzOiByZXNvbHZlKHBhZ2VzRGlyLCBcImRldnRvb2xzXCIsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCBcImNvbnRlbnRcIiwgXCJpbmRleC50c1wiKSxcclxuICAgICAgICBiYWNrZ3JvdW5kOiByZXNvbHZlKHBhZ2VzRGlyLCBcImJhY2tncm91bmRcIiwgXCJpbmRleC50c1wiKSxcclxuICAgICAgICBvcHRpb25zOiByZXNvbHZlKHBhZ2VzRGlyLCBcIm9wdGlvbnNcIiwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgIGNvbnRlbnRTdHlsZTogcmVzb2x2ZShwYWdlc0RpciwgXCJjb250ZW50XCIsIFwic3R5bGUuc2Nzc1wiKSxcclxuICAgICAgICBzaWRlcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsIFwic2lkZXBhbmVsXCIsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgfSxcclxuICAgICAgd2F0Y2g6IHtcclxuICAgICAgICBpbmNsdWRlOiBbXCJzcmMvKipcIiwgXCJ2aXRlLmNvbmZpZy50c1wiXSxcclxuICAgICAgICBleGNsdWRlOiBbXCJub2RlX21vZHVsZXMvKipcIiwgXCJzcmMvKiovKi5zcGVjLnRzXCJdLFxyXG4gICAgICB9LFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJzcmMvcGFnZXMvW25hbWVdL2luZGV4LmpzXCIsXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGlzRGV2XHJcbiAgICAgICAgICA/IFwiYXNzZXRzL2pzL1tuYW1lXS5qc1wiXHJcbiAgICAgICAgICA6IFwiYXNzZXRzL2pzL1tuYW1lXS5baGFzaF0uanNcIixcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBkaXIsIG5hbWU6IF9uYW1lIH0gPSBwYXRoLnBhcnNlKGFzc2V0SW5mby5uYW1lKTtcclxuICAgICAgICAgIGNvbnN0IGFzc2V0Rm9sZGVyID0gZGlyLnNwbGl0KFwiL1wiKS5hdCgtMSk7XHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gYXNzZXRGb2xkZXIgKyBmaXJzdFVwcGVyQ2FzZShfbmFtZSk7XHJcbiAgICAgICAgICBpZiAobmFtZSA9PT0gXCJjb250ZW50U3R5bGVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9jc3MvY29udGVudFN0eWxlJHtjYWNoZUludmFsaWRhdGlvbktleX0uY2h1bmsuY3NzYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBgYXNzZXRzL1tleHRdLyR7bmFtZX0uY2h1bmsuW2V4dF1gO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZmlyc3RVcHBlckNhc2Uoc3RyOiBzdHJpbmcpIHtcclxuICBjb25zdCBmaXJzdEFscGhhYmV0ID0gbmV3IFJlZ0V4cCgvKCB8XilbYS16XS8sIFwiZ1wiKTtcclxuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZShmaXJzdEFscGhhYmV0LCAoTCkgPT4gTC50b1VwcGVyQ2FzZSgpKTtcclxufVxyXG5cclxubGV0IGNhY2hlSW52YWxpZGF0aW9uS2V5OiBzdHJpbmcgPSBnZW5lcmF0ZUtleSgpO1xyXG5mdW5jdGlvbiByZWdlbmVyYXRlQ2FjaGVJbnZhbGlkYXRpb25LZXkoKSB7XHJcbiAgY2FjaGVJbnZhbGlkYXRpb25LZXkgPSBnZW5lcmF0ZUtleSgpO1xyXG4gIHJldHVybiBjYWNoZUludmFsaWRhdGlvbktleTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVLZXkoKTogc3RyaW5nIHtcclxuICByZXR1cm4gYCR7KERhdGUubm93KCkgLyAxMDApLnRvRml4ZWQoKX1gO1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXGlkZWFsQ2FydFxcXFxpZGVhbENhcnQuMi4wXFxcXHV0aWxzXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdpdGh1YlxcXFxpZGVhbENhcnRcXFxcaWRlYWxDYXJ0LjIuMFxcXFx1dGlsc1xcXFxwbHVnaW5zXFxcXG1ha2UtbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdGh1Yi9pZGVhbENhcnQvaWRlYWxDYXJ0LjIuMC91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QudHNcIjtpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgY29sb3JMb2cgZnJvbSBcIi4uL2xvZ1wiO1xyXG5pbXBvcnQgTWFuaWZlc3RQYXJzZXIgZnJvbSBcIi4uL21hbmlmZXN0LXBhcnNlclwiO1xyXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XHJcblxyXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XHJcblxyXG5jb25zdCBkaXN0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiLCBcImRpc3RcIik7XHJcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwiLi5cIiwgXCJwdWJsaWNcIik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlTWFuaWZlc3QoXHJcbiAgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMsXHJcbiAgY29uZmlnOiB7IGlzRGV2OiBib29sZWFuOyBjb250ZW50U2NyaXB0Q3NzS2V5Pzogc3RyaW5nIH1cclxuKTogUGx1Z2luT3B0aW9uIHtcclxuICBmdW5jdGlvbiBtYWtlTWFuaWZlc3QodG86IHN0cmluZykge1xyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHRvKSkge1xyXG4gICAgICBmcy5ta2RpclN5bmModG8pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWFuaWZlc3RQYXRoID0gcmVzb2x2ZSh0bywgXCJtYW5pZmVzdC5qc29uXCIpO1xyXG5cclxuICAgIC8vIE5hbWluZyBjaGFuZ2UgZm9yIGNhY2hlIGludmFsaWRhdGlvblxyXG4gICAgaWYgKGNvbmZpZy5jb250ZW50U2NyaXB0Q3NzS2V5KSB7XHJcbiAgICAgIG1hbmlmZXN0LmNvbnRlbnRfc2NyaXB0cy5mb3JFYWNoKChzY3JpcHQpID0+IHtcclxuICAgICAgICBzY3JpcHQuY3NzID0gc2NyaXB0LmNzcy5tYXAoKGNzcykgPT5cclxuICAgICAgICAgIGNzcy5yZXBsYWNlKFwiPEtFWT5cIiwgY29uZmlnLmNvbnRlbnRTY3JpcHRDc3NLZXkpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnMud3JpdGVGaWxlU3luYyhcclxuICAgICAgbWFuaWZlc3RQYXRoLFxyXG4gICAgICBNYW5pZmVzdFBhcnNlci5jb252ZXJ0TWFuaWZlc3RUb1N0cmluZyhtYW5pZmVzdClcclxuICAgICk7XHJcblxyXG4gICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgXCJzdWNjZXNzXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IFwibWFrZS1tYW5pZmVzdFwiLFxyXG4gICAgYnVpbGRTdGFydCgpIHtcclxuICAgICAgaWYgKGNvbmZpZy5pc0Rldikge1xyXG4gICAgICAgIG1ha2VNYW5pZmVzdChkaXN0RGlyKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJ1aWxkRW5kKCkge1xyXG4gICAgICBpZiAoY29uZmlnLmlzRGV2KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIG1ha2VNYW5pZmVzdChwdWJsaWNEaXIpO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXGlkZWFsQ2FydFxcXFxpZGVhbENhcnQuMi4wXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcaWRlYWxDYXJ0XFxcXGlkZWFsQ2FydC4yLjBcXFxcdXRpbHNcXFxcbG9nLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRodWIvaWRlYWxDYXJ0L2lkZWFsQ2FydC4yLjAvdXRpbHMvbG9nLnRzXCI7dHlwZSBDb2xvclR5cGUgPSBcInN1Y2Nlc3NcIiB8IFwiaW5mb1wiIHwgXCJlcnJvclwiIHwgXCJ3YXJuaW5nXCIgfCBrZXlvZiB0eXBlb2YgQ09MT1JTO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JMb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogQ29sb3JUeXBlKSB7XHJcbiAgbGV0IGNvbG9yOiBzdHJpbmcgPSB0eXBlIHx8IENPTE9SUy5GZ0JsYWNrO1xyXG5cclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgXCJzdWNjZXNzXCI6XHJcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnR3JlZW47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImluZm9cIjpcclxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdCbHVlO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJlcnJvclwiOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwid2FybmluZ1wiOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1llbGxvdztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhjb2xvciwgbWVzc2FnZSk7XHJcbn1cclxuXHJcbmNvbnN0IENPTE9SUyA9IHtcclxuICBSZXNldDogXCJcXHgxYlswbVwiLFxyXG4gIEJyaWdodDogXCJcXHgxYlsxbVwiLFxyXG4gIERpbTogXCJcXHgxYlsybVwiLFxyXG4gIFVuZGVyc2NvcmU6IFwiXFx4MWJbNG1cIixcclxuICBCbGluazogXCJcXHgxYls1bVwiLFxyXG4gIFJldmVyc2U6IFwiXFx4MWJbN21cIixcclxuICBIaWRkZW46IFwiXFx4MWJbOG1cIixcclxuICBGZ0JsYWNrOiBcIlxceDFiWzMwbVwiLFxyXG4gIEZnUmVkOiBcIlxceDFiWzMxbVwiLFxyXG4gIEZnR3JlZW46IFwiXFx4MWJbMzJtXCIsXHJcbiAgRmdZZWxsb3c6IFwiXFx4MWJbMzNtXCIsXHJcbiAgRmdCbHVlOiBcIlxceDFiWzM0bVwiLFxyXG4gIEZnTWFnZW50YTogXCJcXHgxYlszNW1cIixcclxuICBGZ0N5YW46IFwiXFx4MWJbMzZtXCIsXHJcbiAgRmdXaGl0ZTogXCJcXHgxYlszN21cIixcclxuICBCZ0JsYWNrOiBcIlxceDFiWzQwbVwiLFxyXG4gIEJnUmVkOiBcIlxceDFiWzQxbVwiLFxyXG4gIEJnR3JlZW46IFwiXFx4MWJbNDJtXCIsXHJcbiAgQmdZZWxsb3c6IFwiXFx4MWJbNDNtXCIsXHJcbiAgQmdCbHVlOiBcIlxceDFiWzQ0bVwiLFxyXG4gIEJnTWFnZW50YTogXCJcXHgxYls0NW1cIixcclxuICBCZ0N5YW46IFwiXFx4MWJbNDZtXCIsXHJcbiAgQmdXaGl0ZTogXCJcXHgxYls0N21cIixcclxufSBhcyBjb25zdDtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcaWRlYWxDYXJ0XFxcXGlkZWFsQ2FydC4yLjBcXFxcdXRpbHNcXFxcbWFuaWZlc3QtcGFyc2VyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcaWRlYWxDYXJ0XFxcXGlkZWFsQ2FydC4yLjBcXFxcdXRpbHNcXFxcbWFuaWZlc3QtcGFyc2VyXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRodWIvaWRlYWxDYXJ0L2lkZWFsQ2FydC4yLjAvdXRpbHMvbWFuaWZlc3QtcGFyc2VyL2luZGV4LnRzXCI7dHlwZSBNYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjM7XHJcblxyXG5jbGFzcyBNYW5pZmVzdFBhcnNlciB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBzdGF0aWMgY29udmVydE1hbmlmZXN0VG9TdHJpbmcobWFuaWZlc3Q6IE1hbmlmZXN0KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCwgbnVsbCwgMik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5pZmVzdFBhcnNlcjtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcaWRlYWxDYXJ0XFxcXGlkZWFsQ2FydC4yLjBcXFxcdXRpbHNcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXGlkZWFsQ2FydFxcXFxpZGVhbENhcnQuMi4wXFxcXHV0aWxzXFxcXHBsdWdpbnNcXFxcY3VzdG9tLWR5bmFtaWMtaW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRodWIvaWRlYWxDYXJ0L2lkZWFsQ2FydC4yLjAvdXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjdXN0b21EeW5hbWljSW1wb3J0KCk6IFBsdWdpbk9wdGlvbiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IFwiY3VzdG9tLWR5bmFtaWMtaW1wb3J0XCIsXHJcbiAgICByZW5kZXJEeW5hbWljSW1wb3J0KCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxlZnQ6IGBcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjb25zdCBkeW5hbWljSW1wb3J0ID0gKHBhdGgpID0+IGltcG9ydChwYXRoKTtcclxuICAgICAgICAgIGR5bmFtaWNJbXBvcnQoXHJcbiAgICAgICAgICBgLFxyXG4gICAgICAgIHJpZ2h0OiBcIil9XCIsXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxcaWRlYWxDYXJ0XFxcXGlkZWFsQ2FydC4yLjBcXFxcdXRpbHNcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXGlkZWFsQ2FydFxcXFxpZGVhbENhcnQuMi4wXFxcXHV0aWxzXFxcXHBsdWdpbnNcXFxcYWRkLWhtci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2l0aHViL2lkZWFsQ2FydC9pZGVhbENhcnQuMi4wL3V0aWxzL3BsdWdpbnMvYWRkLWhtci50c1wiO2ltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcclxuXHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuX19ERVZfXyA9PT0gXCJ0cnVlXCI7XHJcblxyXG5jb25zdCBEVU1NWV9DT0RFID0gYGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCl7fTtgO1xyXG5cclxuZnVuY3Rpb24gZ2V0SW5qZWN0aW9uQ29kZShmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gcmVhZEZpbGVTeW5jKFxyXG4gICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLlwiLCBcInJlbG9hZFwiLCBcImluamVjdGlvbnNcIiwgZmlsZU5hbWUpLFxyXG4gICAgeyBlbmNvZGluZzogXCJ1dGY4XCIgfVxyXG4gICk7XHJcbn1cclxuXHJcbnR5cGUgQ29uZmlnID0ge1xyXG4gIGJhY2tncm91bmQ/OiBib29sZWFuO1xyXG4gIHZpZXc/OiBib29sZWFuO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkSG1yKGNvbmZpZz86IENvbmZpZyk6IFBsdWdpbk9wdGlvbiB7XHJcbiAgY29uc3QgeyBiYWNrZ3JvdW5kID0gZmFsc2UsIHZpZXcgPSB0cnVlIH0gPSBjb25maWcgfHwge307XHJcbiAgY29uc3QgaWRJbkJhY2tncm91bmRTY3JpcHQgPSBcInZpcnR1YWw6cmVsb2FkLW9uLXVwZGF0ZS1pbi1iYWNrZ3JvdW5kLXNjcmlwdFwiO1xyXG4gIGNvbnN0IGlkSW5WaWV3ID0gXCJ2aXJ0dWFsOnJlbG9hZC1vbi11cGRhdGUtaW4tdmlld1wiO1xyXG5cclxuICBjb25zdCBzY3JpcHRIbXJDb2RlID0gaXNEZXYgPyBnZXRJbmplY3Rpb25Db2RlKFwic2NyaXB0LmpzXCIpIDogRFVNTVlfQ09ERTtcclxuICBjb25zdCB2aWV3SG1yQ29kZSA9IGlzRGV2ID8gZ2V0SW5qZWN0aW9uQ29kZShcInZpZXcuanNcIikgOiBEVU1NWV9DT0RFO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogXCJhZGQtaG1yXCIsXHJcbiAgICByZXNvbHZlSWQoaWQpIHtcclxuICAgICAgaWYgKGlkID09PSBpZEluQmFja2dyb3VuZFNjcmlwdCB8fCBpZCA9PT0gaWRJblZpZXcpIHtcclxuICAgICAgICByZXR1cm4gZ2V0UmVzb2x2ZWRJZChpZCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsb2FkKGlkKSB7XHJcbiAgICAgIGlmIChpZCA9PT0gZ2V0UmVzb2x2ZWRJZChpZEluQmFja2dyb3VuZFNjcmlwdCkpIHtcclxuICAgICAgICByZXR1cm4gYmFja2dyb3VuZCA/IHNjcmlwdEhtckNvZGUgOiBEVU1NWV9DT0RFO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaWQgPT09IGdldFJlc29sdmVkSWQoaWRJblZpZXcpKSB7XHJcbiAgICAgICAgcmV0dXJuIHZpZXcgPyB2aWV3SG1yQ29kZSA6IERVTU1ZX0NPREU7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmVzb2x2ZWRJZChpZDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIFwiXFwwXCIgKyBpZDtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGdpdGh1YlxcXFxpZGVhbENhcnRcXFxcaWRlYWxDYXJ0LjIuMFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0aHViXFxcXGlkZWFsQ2FydFxcXFxpZGVhbENhcnQuMi4wXFxcXG1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRodWIvaWRlYWxDYXJ0L2lkZWFsQ2FydC4yLjAvbWFuaWZlc3QudHNcIjtpbXBvcnQgcGFja2FnZUpzb24gZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XHJcblxyXG4vKipcclxuICogQWZ0ZXIgY2hhbmdpbmcsIHBsZWFzZSByZWxvYWQgdGhlIGV4dGVuc2lvbiBhdCBgY2hyb21lOi8vZXh0ZW5zaW9uc2BcclxuICovXHJcbmNvbnN0IG1hbmlmZXN0OiBjaHJvbWUucnVudGltZS5NYW5pZmVzdFYzID0ge1xyXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXHJcbiAgbmFtZTogXCJpZGVhbENhcnRcIixcclxuICB2ZXJzaW9uOiBwYWNrYWdlSnNvbi52ZXJzaW9uLFxyXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcclxuICBvcHRpb25zX3BhZ2U6IFwic3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbFwiLFxyXG4gIGJhY2tncm91bmQ6IHtcclxuICAgIHNlcnZpY2Vfd29ya2VyOiBcInNyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LmpzXCIsXHJcbiAgICB0eXBlOiBcIm1vZHVsZVwiLFxyXG4gIH0sXHJcbiAgaWNvbnM6IHtcclxuICAgIFwiMTI4XCI6IFwiaWNvbi0xMjgucG5nXCIsXHJcbiAgfSxcclxuICBhY3Rpb246IHtcclxuICAgIGRlZmF1bHRfaWNvbjogXCJpY29uLTEyOC5wbmdcIixcclxuICB9LFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbXCJodHRwOi8vKi8qXCIsIFwiaHR0cHM6Ly8qLypcIiwgXCI8YWxsX3VybHM+XCJdLFxyXG4gICAgICBqczogW1wic3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXguanNcIl0sXHJcbiAgICAgIC8vIEtFWSBmb3IgY2FjaGUgaW52YWxpZGF0aW9uXHJcbiAgICAgIGNzczogW1wiYXNzZXRzL2Nzcy9jb250ZW50U3R5bGU8S0VZPi5jaHVuay5jc3NcIl0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgZGV2dG9vbHNfcGFnZTogXCJzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbFwiLFxyXG4gIHBlcm1pc3Npb25zOiBbXCJzdG9yYWdlXCIsIFwiYWN0aXZlVGFiXCIsIFwidGFic1wiXSxcclxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcclxuICAgIHtcclxuICAgICAgcmVzb3VyY2VzOiBbXHJcbiAgICAgICAgXCJhc3NldHMvanMvKi5qc1wiLFxyXG4gICAgICAgIFwiYXNzZXRzL2Nzcy8qLmNzc1wiLFxyXG4gICAgICAgIFwic3JjL3BhZ2VzLyovKi5odG1sXCIsXHJcbiAgICAgICAgXCJzcmMvcGFnZXMvKi8qLmpzXCIsXHJcbiAgICAgICAgXCJpY29uLTEyOC5wbmdcIixcclxuICAgICAgICBcImljb24tMzQucG5nXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIG1hdGNoZXM6IFtcIio6Ly8qLypcIl0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYW5pZmVzdDtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UixTQUFTLG9CQUFvQjtBQUMxVCxPQUFPLFdBQVc7QUFDbEIsT0FBT0EsU0FBUSxXQUFBQyxnQkFBZTs7O0FDRmlULFlBQVksUUFBUTtBQUNuVyxZQUFZLFVBQVU7OztBQ0NQLFNBQVIsU0FBMEIsU0FBaUIsTUFBa0I7QUFDbEUsTUFBSSxRQUFnQixRQUFRLE9BQU87QUFFbkMsVUFBUSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLElBQ0YsS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsSUFDRixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxFQUNKO0FBRUEsVUFBUSxJQUFJLE9BQU8sT0FBTztBQUM1QjtBQUVBLElBQU0sU0FBUztBQUFB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VTtBQUFBLFFBQ3RELFNBQVNBLFNBQVEsVUFBVSxXQUFXLFlBQVk7QUFBQSxRQUNsRCxjQUFjQSxTQUFRLFVBQVUsV0FBVyxZQUFZO0FBQUEsUUFDdkQsV0FBV0EsU0FBUSxVQUFVLGFBQWEsWUFBWTtBQUFBLE1BQ3hEO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsVUFBVSxnQkFBZ0I7QUFBQSxRQUNwQyxTQUFTLENBQUMsbUJBQW1CLGtCQUFrQjtBQUFBLE1BQ2pEO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0JHLFNBQ1osd0JBQ0E7QUFBQSxRQUNKLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsZ0JBQU0sRUFBRSxLQUFLLE1BQU0sTUFBTSxJQUFJQyxNQUFLLE1BQU0sVUFBVSxJQUFJO0FBQ3RELGdCQUFNLGNBQWMsSUFBSSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEMsZ0JBQU0sT0FBTyxjQUFjLGVBQWUsS0FBSztBQUMvQyxjQUFJLFNBQVMsZ0JBQWdCO0FBQzNCLG1CQUFPLDBCQUEwQjtBQUFBLFVBQ25DO0FBQ0EsaUJBQU8sZ0JBQWdCO0FBQUEsUUFDekI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsU0FBUyxlQUFlLEtBQWE7QUFDbkMsUUFBTSxnQkFBZ0IsSUFBSSxPQUFPLGNBQWMsR0FBRztBQUNsRCxTQUFPLElBQUksWUFBWSxFQUFFLFFBQVEsZUFBZSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7QUFDeEU7QUFFQSxJQUFJLHVCQUErQixZQUFZO0FBQy9DLFNBQVMsaUNBQWlDO0FBQ3hDLHlCQUF1QixZQUFZO0FBQ25DLFNBQU87QUFDVDtBQUVBLFNBQVMsY0FBc0I7QUFDN0IsU0FBTyxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssUUFBUTtBQUN2QzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJyZXNvbHZlIiwgIm1hbmlmZXN0IiwgIm1hbmlmZXN0IiwgIm1ha2VNYW5pZmVzdCIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgInJlc29sdmUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicHVibGljRGlyIiwgImlzRGV2IiwgInBhdGgiXQp9Cg==
