import React from "react";

import CommonProvider from "@/providers/common-provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommonProvider>
      <div className="min-h-screen max-w-screen flex items-center justify-center bg-gradient-to-tr from-sky-400 to-purple-500 overflow-hidden">
        {children}
      </div>
    </CommonProvider>
  );
};

export default RootLayout;
