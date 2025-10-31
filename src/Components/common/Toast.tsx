import React from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
};

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center transition-all duration-300 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
