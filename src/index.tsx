import style from "./index.module.scss";
import "./index.scss";
import { ReactComponent as ReactLogo } from "./assets/images/logo.svg";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOMClient from "react-dom/client";
import App from "./components/app/app";
import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <ParallaxProvider scrollAxis="vertical">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ParallaxProvider>
  </React.StrictMode>,
);
