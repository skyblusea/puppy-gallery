import React, { FC, ReactNode } from "react";


interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
