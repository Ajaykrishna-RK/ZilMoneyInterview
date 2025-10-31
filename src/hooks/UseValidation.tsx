import { useState, useEffect } from "react";

export type ValidationRule = {
  validate: (value: string) => boolean;
  message: string;
};

export function useValidation(
  value: string,
  rules: ValidationRule[]
): { error: string; isValid: boolean } {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    for (const rule of rules) {
      if (!rule.validate(value)) {
        setError(rule.message);
        setIsValid(false);
        return;
      }
    }
    setError("");
    setIsValid(true);
  }, [value, rules]);

  return { error, isValid };
}
