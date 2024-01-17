"use client";

import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBar() {
  return (
    <AppProgressBar
      height="0.25rem"
      color="#8687e7"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
