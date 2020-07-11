import styled from "styled-components";
import { Theme } from "../../themes";

import { ThemedStyledFunction } from "styled-components";
interface ButtonProps {
  secondary?: boolean;
  theme?: Theme;
  disabled?: boolean;
}

const ButtonComponent = styled.a<ButtonProps>`
  display: block;
  background: ${({ secondary, theme }) => {
    return secondary ? theme.ButtonSecondary : theme.ButtonColour;
  }};
  opacity: ${({ disabled }) => {
    return disabled ? "0.6" : "1";
  }};
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: ${({ disabled }) => {
    return disabled ? "default" : "pointer";
  }};
  transition: all 0.15s ease;
  text-align: center;

  &:hover {
    transform: translateY(-1px);
    -webkit-transform: translateY(-1px);
  }

  &:active {
    box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
      0 3px 7px -3px rgba(0, 0, 0, 0.3);
    transform: translateY(1px);
    -webkit-transform: translateY(1px);
  }
`;

export const Button: React.FC<any> = ({
  children,
  onClick,
  disabled = false,
  ...rest
}) => {
  return (
    <ButtonComponent
      onClick={(e: any) => {
        if (disabled) {
          return;
        }
        onClick(e);
      }}
      disabled={disabled}
      {...rest}
    >
      {children}
    </ButtonComponent>
  );
};
