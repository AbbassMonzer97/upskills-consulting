import React, { useEffect, useState } from "react";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Skip rendering on the server
  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`custom-input p-3 w-full border ${
          error ? "border-red-300" : ""
        }`}
      />
      {error && (
        <p className="text-red-300 text-left text-sm -mt-[10px]">{error}</p>
      )}
    </>
  );
};