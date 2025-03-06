import { Card, CardProps,  } from "antd";
import { ReactNode } from "react";

export default function AntCard(props: CardProps): ReactNode {
  return <Card {...props} />;
}
