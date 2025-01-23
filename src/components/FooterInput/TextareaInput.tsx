import React, { useEffect, useState } from "react";

interface TextareaInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({
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
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className={`custom-input p-3 w-full border max-h-[500px] overflow-auto resize-y ${
          error ? "border-red-300" : ""
        }`}
      />
      {error && (
        <p className="text-red-300 text-left text-sm -mt-[10px]">{error}</p>
      )}
    </>
  );
};
