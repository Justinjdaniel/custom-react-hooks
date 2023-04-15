import { useState, useEffect, useRef } from 'react';

// Debounce function to limit the frequency of function calls
function debounceFunction(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default function useSize(ref) {
  const [elementSize, setElementSize] = useState({});
  const previousSize = useRef(elementSize);

  useEffect(() => {
    // If ref.current is null, exit the effect
    if (ref.current == null) return;

    // Update the element size with debounced function
    const updateElementSize = debounceFunction(([entry]) => {
      const newSize = entry.contentRect;
      // Check if new size is different from previous size
      if (
        newSize.width !== previousSize.current.width ||
        newSize.height !== previousSize.current.height
      ) {
        // Update the element size state
        setElementSize(newSize);
        // Update the previous size ref
        previousSize.current = newSize;
      }
    }, 100);

    // Create a new ResizeObserver and observe the element
    const observer = new ResizeObserver(updateElementSize);
    observer.observe(ref.current);
    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, [ref]);

  // Return the element size object
  return elementSize;
}
