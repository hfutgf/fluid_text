import type { InputProps, InputRef } from "antd";
import { Input } from "antd";
import { forwardRef } from "react";

const AntPasswordInput = forwardRef<InputRef, InputProps>((props, ref) => {
  return <Input.Password ref={ref} {...props} />;
});

AntPasswordInput.displayName = "AntPasswordInput";

export default AntPasswordInput;
