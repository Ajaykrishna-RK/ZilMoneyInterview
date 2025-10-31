import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onEnter?: () => void;
  error?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  onEnter,
  error,
  className = "",
}) => {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) onEnter();
        }}
        className={`border rounded-lg px-3 py-2 w-full focus:outline-none ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:ring-2 focus:ring-blue-200"
        } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
