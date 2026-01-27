"use client";

import { useState } from "react";

export function useSearch() {
  const [value, setValue] = useState("");

  return {
    value,
    setValue,
  };
}
