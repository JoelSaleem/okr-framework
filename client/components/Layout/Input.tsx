import styled from "styled-components";
import { Theme } from "../../themes";

export const Input = styled.input`
  padding: 8px 16px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid
    ${(props: { theme: Theme }) => {
      return props.theme.ButtonColour;
    }};
  color: ${(props: { theme: Theme }) => {
    return props.theme.TextColour;
  }};
`;
