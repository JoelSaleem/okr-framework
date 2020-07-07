import { LabelInput, LabelInputProps } from "./LabelInput";
import { useState, useEffect } from "react";

export const NumberInput: React.FC<
  { onChange: (val: string) => void } & Omit<LabelInputProps, "onChange">
> = ({ onChange, value, ...rest }) => {
  const [internalVal, setInternalVal] = useState(value);

  useEffect(() => {
    setInternalVal(value);
  }, [value]);
  return (
    <LabelInput
      onBlur={() => {
        onChange(internalVal);
      }}
      value={internalVal}
      onChange={(e) => {
        setInternalVal(e.target.value);
      }}
      {...rest}
    />
  );
};
