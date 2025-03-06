import {  Tooltip, TooltipProps,  } from "antd";
import { ReactNode } from "react";

export default function AntTooltip(props: TooltipProps): ReactNode {
  return <Tooltip {...props} />;
}
