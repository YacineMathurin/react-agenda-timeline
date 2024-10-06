import React from "react";
import { ButtonProps } from "./button";

type ProtectedButtonProps = React.FC<ButtonProps>;

export const ProtectedButton = (
  Component: ProtectedButtonProps,
  hasPermission: boolean
) => {
  return (props: ButtonProps) => {
    if (hasPermission) {
      return <Component {...props} />;
    }
    return <h1>Need to auth first</h1>;
  };
};
