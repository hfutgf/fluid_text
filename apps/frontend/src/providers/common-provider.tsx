"use client";

import NextTopLoader from "nextjs-toploader";
import React from "react";
import { ToastContainer } from "react-toastify";

const CommonProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      <NextTopLoader
        color="#9333ea"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        zIndex={1600}
        showAtBottom={false}
      />
      {children}
    </>
  );
};

export default CommonProvider;
