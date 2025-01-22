"use client"; // Mark this as a Client Component

import { useEffect, ReactNode } from "react";

interface SuppressErrorsWrapperProps {
  children: ReactNode;
}

export default function SuppressErrorsWrapper({
  children,
}: SuppressErrorsWrapperProps) {
  useEffect(() => {
    // Suppress hydration and WebSocket errors
    const originalConsoleError = console.error;

    console.error = (...args: any[]) => {
      if (
        args[0]?.includes("Hydration failed") ||
        args[0]?.includes("WebSocket connection to")
      ) {
        return; // Ignore these errors
      }
      originalConsoleError(...args); // Log all other errors
    };

    // Cleanup function to restore the original console.error
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return <>{children}</>;
}
