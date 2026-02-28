"use client";

import { useState } from "react";

export function useWatchSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleSubscription = () => {
    setIsSubscribed((prev) => !prev);
  };

  return {
    isSubscribed,
    toggleSubscription,
  };
}
