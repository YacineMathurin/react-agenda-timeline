import React from "react";
import { ProtectedButton } from "./protected-button";

export type ButtonProps = {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return <button {...props}>{text}</button>;
};

export default ProtectedButton(Button, true);
