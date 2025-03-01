import CommonProvider from "@/providers/common-provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <CommonProvider>{children}</CommonProvider>;
};

export default RootLayout;
