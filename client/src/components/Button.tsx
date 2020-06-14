import { MouseEvent } from "react";

interface BtnProps {
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const Button: React.FC<BtnProps> = ({ children, onClick }) => {
  return (
    <a className={btnClassName} onClick={onClick}>
      {children}
    </a>
  );
};

const btnClassName =
  "bg-light-pink br2 shadow-4 pointer link f6 grow ph3 pv2 mb2 dib white";
