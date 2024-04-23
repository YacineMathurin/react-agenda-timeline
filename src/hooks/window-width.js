import { useLayoutEffect, useState } from "react";

export function useWindowWidth() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateWidth() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return size;
}
