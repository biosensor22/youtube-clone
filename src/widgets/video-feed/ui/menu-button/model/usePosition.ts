import { useEffect, RefObject, useState } from "react";

export function usePosition(ref: RefObject<HTMLDivElement>) {
  const [position, setPosition] = useState("right");

  useEffect(() => {
    const handlePosition = () => {
      const modal = (ref as RefObject<HTMLDivElement>)?.current;
      if (modal) {
        const rect = modal.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          setPosition("left");
        } else {
          setPosition("right");
        }
      }
    };

    handlePosition();
  }, [ref]);

  return { position };
}
