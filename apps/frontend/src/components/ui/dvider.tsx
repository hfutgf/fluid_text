import {  Divider, DividerProps,  } from "antd";
import { ReactNode } from "react";

export default function AntDvider(props: DividerProps): ReactNode {
  return <Divider {...props} />;
}
