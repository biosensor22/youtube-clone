"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../api/getUserData";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getUserData,
    staleTime: 1000 * 60 * 5,
  });
}
