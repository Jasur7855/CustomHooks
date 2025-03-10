import { useState, useRef, useEffect } from 'react';

interface UseHoverResult<T extends HTMLElement> {
  hovered: boolean;
  ref: React.RefObject<T>;
}

export function useHover<T extends HTMLElement>(): UseHoverResult<T> {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null!); // Убираем возможность `null`

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { hovered, ref };
}
