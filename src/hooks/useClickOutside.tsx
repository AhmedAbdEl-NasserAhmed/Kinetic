import { useEffect, useRef } from "react";

interface Props {
  close?: (value) => void;
  StopBubbling?: boolean;
  value: string | boolean;
}

function useClickOutside({ close, value, StopBubbling }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    function handler(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close(value);
        document.body.classList.remove("stop-scrolling");
      }
    }

    window.addEventListener("click", handler, StopBubbling);

    return () => window.removeEventListener("click", handler, StopBubbling);
  }, [close, StopBubbling, value]);

  return ref;
}

export default useClickOutside;
