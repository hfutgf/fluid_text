import {   Popover, PopoverProps,  } from "antd";
import { ReactNode } from "react";

export default function AntPopover(props: PopoverProps): ReactNode {
  return <Popover {...props} />;
}
