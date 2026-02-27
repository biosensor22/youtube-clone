"use client";

import { useEffect, useState } from "react";
import { fetchCountNotif } from "../api/countNotifApi";

export function useCountNotif() {
  const [countOfNotif, setCountOfNotif] = useState(0);

  const clearNotifCount = () => {
    setCountOfNotif(0);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchCountNotif();
        setCountOfNotif(typeof res === "number" ? res : 0);
      } catch {
        setCountOfNotif(0);
      }
    };
    loadData();
  }, []);
  return { countOfNotif, clearNotifCount };
}
