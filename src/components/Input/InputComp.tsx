"use client";

import { useState, useEffect } from "react";

export default function InputComp(props: any) {
  const { plc, onChange, onKeyDown } = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Skip rendering on the server

  return (
    <input
      type="email"
      onChange={onChange}
      placeholder={plc}
      className="p-3 border rounded-l md:w-[50%] w-full border-[#A5A5A5]"
      onKeyDown={onKeyDown}
    />
  );
}
