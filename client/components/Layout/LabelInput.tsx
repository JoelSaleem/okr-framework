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
}

export const LabelInput: React.FC<LabelInputProps> = ({
  label,
  onChange,
  value,
}) => {
  return (
    <Wrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <Input onChange={onChange} value={value} />
    </Wrapper>
  );
};
