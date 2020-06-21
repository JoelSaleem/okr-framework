import { CSSProperties, ChangeEvent } from "react";

interface InputProps {
  input?: CSSProperties;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
}

export const Input: React.FC<InputProps> = ({ onChange, label, value }) => {
  const renderlabel = () => {
    if (label) {
      return (
        <span
          style={{ minWidth: 100 }}
          className="justify-end flex items-center mr2"
        >
          {label}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-auto mt2">
      {renderlabel()}
      <input
        className="bg-transparent white"
        style={styles.inputStyle}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  inputStyle: {
    flex: 2,
    borderBottom: "1px solid pink",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
  },
};
