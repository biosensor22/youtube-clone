"use client";

import { useState } from "react";

export function useToggleReplies() {
  const [openedReplies, setOpenedReplies] = useState<Record<string, boolean>>(
    {},
  );

  const toggleReplies = (id: string) => {
    setOpenedReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return { openedReplies, toggleReplies };
}
