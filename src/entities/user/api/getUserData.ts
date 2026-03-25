import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { UserData } from "../model/types";

export async function getUserData(): Promise<UserData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.user_data}`);

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data: UserData[] = await res.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("[User API]:", err);
  }
  return [];
}
