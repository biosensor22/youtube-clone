"use client";
import { useState } from "react";

export function usePress() {
  const [pressed, setPressed] = useState(false);

  const onPress = () => setPressed(true);
  const onRelease = () => setPressed(false);

  return { pressed, onPress, onRelease };
}
