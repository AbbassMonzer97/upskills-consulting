"use client";
import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window?.innerWidth < 768); // Tailwind's 'md' breakpoint
    };

    // Initial check (only after the component is mounted)
    handleResize();

    // Add event listener for resize
    window?.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export default useIsMobile;
