import type { SubscriptionsSideMenu } from "@/entities/subscriptions";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";

export function getPriority(s: SubscriptionsSideMenu) {
  if (s.live) return 1;
  if (s.newVideoChecked) return 2;
  return 3;
}

export async function fetchSubscriptions(): Promise<SubscriptionsSideMenu[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.subscriptions}`);
    if (!res.ok) {
      throw new Error(`[Subscriptions API] Failed: ${res.status}`);
    }

    const data: SubscriptionsSideMenu[] = await res.json();

    if (!Array.isArray(data)) {
      console.warn("[Subscriptions API] Unexpected data format:", data);
      return [];
    }

    return [...data].sort((a, b) => getPriority(a) - getPriority(b));
  } catch (err) {
    console.error(err);
  }
  return [];
}
