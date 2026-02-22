import { useEffect, useState } from "react";

export function useIsMobileWidth() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSearch, setIsMobileSearchBar] = useState(false);

  const handleBack = () => {
    setIsMobileSearchBar(false);
  };

  const openMobileSearch = () => {
    setIsMobileSearchBar(true);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const listener = () => setIsMobile(media.matches);

    listener();
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return { isMobile, isMobileSearch, handleBack, openMobileSearch };
}
