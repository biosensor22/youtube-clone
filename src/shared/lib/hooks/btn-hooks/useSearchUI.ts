"use client";

import { useRef, useState } from "react";

export function useSearchUI() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocused = () => setIsFocused(true);
  const onBlured = () => setIsFocused(false);

  const focusRef = () => inputRef.current?.focus();

  return { isFocused, onFocused, onBlured, focusRef, inputRef };
}
