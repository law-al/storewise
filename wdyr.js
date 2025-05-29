// wdyr.js
import React from "react";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const initWDYR = async () => {
    const { default: whyDidYouRender } = await import(
      "@welldone-software/why-did-you-render"
    );
    whyDidYouRender(React, {
      trackAllPureComponents: true,
    });
  };
  initWDYR();
}
