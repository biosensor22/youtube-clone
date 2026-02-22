import type { SubscriptionsSideMenu } from "../model/types";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";

function getPriority(s: SubscriptionsSideMenu) {
  if (s.live) return 1;
  if (s.newVideoChecked) return 2;
  return 3;
}

export async function fetchSubscriptions(
  userId: string,
): Promise<SubscriptionsSideMenu[]> {
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
