import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { Notifications } from "@/entities/notifications";

export async function fetchClearNotif() {
  const baseUrl = `${API_BASE_URL}${API_ROUTES.notifications}`;

  try {
    const listRes = await fetch(`${baseUrl}?checked=false`);
    if (!listRes.ok) throw new Error(`Fetch failed: ${listRes.status}`);

    const notifications: Notifications[] = await listRes.json();
    if (!notifications.length) return;

    await Promise.all(
      notifications.map((notification) =>
        fetch(`${baseUrl}/${notification.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checked: true }),
        }),
      ),
    );
  } catch (err) {
    console.error("[Notifications API]:", err);
  }
}
