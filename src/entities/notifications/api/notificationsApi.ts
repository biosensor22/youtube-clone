import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { Notifications } from "../model/types";

export async function fetchNotifications(userId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.notifications}`);

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data: Notifications[] = await res.json();
    return data;
  } catch (err) {
    console.error("[Notifications API]:", err);
    return [];
  }
}
