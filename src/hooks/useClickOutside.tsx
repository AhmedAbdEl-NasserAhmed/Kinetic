import { useEffect, useRef } from "react";

interface Props {
  close?: (name: string) => void;
  StopBubbling?: boolean;
}

function useClickOutside({ close, StopBubbling }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    function handler(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close("");
        document.body.classList.remove("stop-scrolling");
      }
    }

    window.addEventListener("click", handler, StopBubbling);

    return () => window.removeEventListener("click", handler, StopBubbling);
  }, [close, StopBubbling]);

  return ref;
}

export default useClickOutside;
