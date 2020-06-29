import styled from "styled-components";
import { Input } from "./Input";
import { ChangeEvent } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
`;

const LabelWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LabelInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  type?: string;
}

export const LabelInput: React.FC<LabelInputProps> = ({
  label,
  onChange,
  value,
  type,
}) => {
  return (
    <Wrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <Input type={type} onChange={onChange} value={value} />
    </Wrapper>
  );
};
