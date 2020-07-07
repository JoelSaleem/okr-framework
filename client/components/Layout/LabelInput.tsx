import styled from "styled-components";
import { Input } from "./Input";
import { ChangeEvent } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
`;

const LabelWrapper = styled.span`
  text-align: end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 12px;
`;

export interface LabelInputProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  type?: string;
  disabled?: boolean;
  onBlur?: (e: any) => void;
}

export const LabelInput: React.FC<LabelInputProps> = ({
  label,
  onChange = () => {},
  value,
  type,
  disabled = false,
  onBlur = () => {},
}) => {
  return (
    <Wrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <Input
        onBlur={(e) => onBlur(e)}
        disabled={disabled}
        type={type}
        onChange={(e) => {
          if (!disabled) {
            onChange(e);
          }
        }}
        value={value}
      />
    </Wrapper>
  );
};
