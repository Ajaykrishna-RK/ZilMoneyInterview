import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}) => {
  const baseClasses =
    "px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

  const disabledClasses = disabled
    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
    : "hover:opacity-90";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
