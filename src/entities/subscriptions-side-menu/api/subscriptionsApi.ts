import type { SubscriptionsSideMenu } from "../model/types";

interface SubscriptionsResponse {
  subscriptions: SubscriptionsSideMenu[];
}

function getPriority(s: SubscriptionsSideMenu) {
  if (s.live) return 1;
  if (s.newVideoChecked) return 2;
  return 3;
}

export async function fetchSubscriptions(
  userId: string,
): Promise<SubscriptionsSideMenu[]> {
  try {
    const res = await fetch("/api/subscriptions.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(`[Subscriptions API] Failed: ${res.status}`);
    }

    const data: SubscriptionsResponse = await res.json();

    if (!data || !Array.isArray(data.subscriptions)) {
      console.warn("[Subscriptions API] Unexpected data format:", data);
      return [];
    }

    const subscriptions = [...data.subscriptions].sort(
      (a, b) => getPriority(a) - getPriority(b),
    );

    return subscriptions;
  } catch (err) {
    console.error(err);
  }
  return [];
}
