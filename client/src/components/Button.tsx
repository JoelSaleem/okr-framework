import { MouseEvent, CSSProperties } from "react";

interface BtnProps {
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  classNames?: string;
  style: CSSProperties;
}

export const Button: React.FC<BtnProps> = ({
  children,
  onClick,
  classNames,
  style,
}) => {
  return (
    <a style={style} className={btnClassName + classNames} onClick={onClick}>
      {children}
    </a>
  );
};

const btnClassName =
  "bg-light-pink br2 shadow-4 pointer link f6 grow ph3 pv2 mb2 dib white flex justify-center items-center ";
