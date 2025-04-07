// NavigationLoader.tsx
'use client';
import React from "react";

const NavigationLoader = () => {
  return (
    <div
      className="border-grid sticky top-0 z-50 w-full h-14 border-b bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary"
      aria-hidden="true"
    >
      {/* Empty placeholder for navigation */}
    </div>
  );
};

export default NavigationLoader;
