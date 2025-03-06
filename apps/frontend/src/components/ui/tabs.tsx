import { Tabs, TabsProps } from "antd";
import { ReactNode } from "react";

export default function AntTabs(props: TabsProps): ReactNode {
  return <Tabs {...props} />;
}
