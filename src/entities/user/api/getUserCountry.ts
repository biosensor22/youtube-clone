import { EXTERNAL_API } from "@/shared/api/config";

export async function getUserCountry() {
  try {
    const res = await fetch(`${EXTERNAL_API.user_country}`);

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data = await res.json();
    console.log(data);

    return data.country;
  } catch (err) {
    console.error("[User API]:", err);
  }
  return "";
}
