import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

const useScrollDirection = (callback?: (direction: ScrollDirection) => void): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    let direction: ScrollDirection = null;

    if (currentScrollY > lastScrollY) {
      direction = 'down';
    } else if (currentScrollY < lastScrollY) {
      direction = 'up';
    }

    if (direction && direction !== scrollDirection) {
      setScrollDirection(direction);
      if (callback) callback(direction);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [lastScrollY, scrollDirection, callback]);

  return scrollDirection;
};

export default useScrollDirection;
