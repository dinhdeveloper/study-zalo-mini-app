import "zmp-ui/zaui.css";
import "@/css/tailwind.scss";
import "@/css/app.scss";

import React from "react";
import { createRoot } from "react-dom/client";

import Layout from "@/components/layout";
import { checkAppVersion } from "@/services/app-version/appVersionService";

import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig as any;
}

checkAppVersion(); // fire-and-forget, không block render

const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(Layout));