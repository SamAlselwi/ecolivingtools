'use client';

import React from "react";
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useDetectClickOutside(handelAction: () => void) {
  const ref = React.useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (ref.current && !ref.current.contains(target)) {
      handelAction();
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref };
}

export default useDetectClickOutside;
