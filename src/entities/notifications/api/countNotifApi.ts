import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { Notifications } from "@/entities/notifications";

export async function fetchCountNotif(): Promise<number> {
  try {
    const res = await fetch(
      `${API_BASE_URL}${API_ROUTES.notifications}?checked=false`,
    );

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data: Notifications[] = await res.json();

    return data.length;
  } catch (err) {
    console.error("[Notifications API]:", err);
    return 0;
  }
}
