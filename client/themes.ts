import { useState } from "react";

export type Theme = {
  BackgroundMain: string;
  BackgroundAccent: string;
  CardColour: string;
  ButtonColour: string;
  TextColour: string;
};

const DarkTheme: Theme = {
  BackgroundMain: "#4A148C",
  BackgroundAccent: "#9C27B0",
  CardColour: "#CE93D8",
  TextColour: "white",
  ButtonColour: "#E1BEE7",
};

export const appThemes = [DarkTheme];

export const useTheme = (): [number, () => void] => {
  const [index, setIndex] = useState(0);
  const numThemes = appThemes.length;

  const inc = () => {
    setIndex((index + 1) % numThemes);
  };

  return [index, inc];
};
