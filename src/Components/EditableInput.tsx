import React, { useState } from "react";
import Button from "./common/Button";


type EditableInputProps = {
  initialValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
};

const EditableInput: React.FC<EditableInputProps> = ({
  initialValue,
  onSave,
  onCancel,
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 text-sm flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
        autoFocus
      />

      <Button
        onClick={() => onSave(value)}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Save
      </Button>

      <Button
        onClick={onCancel}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        Cancel
      </Button>
    </div>
  );
};

export default EditableInput;
