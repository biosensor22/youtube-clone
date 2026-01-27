import type { Category } from "../model/types";

interface CategoryDTO {
  topics_library: Category[];
  users_preferences: Record<string, string[]>;
}

const sortCategoriesByType = (categories: Category[]): Category[] => {
  const priority: Record<string, number> = {
    global: 1,
    interest: 2,
    system: 3,
  };

  return [...categories].sort(
    (a, b) => (priority[a.type] ?? 99) - (priority[b.type] ?? 99),
  );
};

export async function fetchCategories(userId: string): Promise<Category[]> {
  try {
    const res = await fetch("/api/categories.json");

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data: CategoryDTO = await res.json();

    const library = data?.topics_library ?? [];
    const userPrefs = data?.users_preferences?.[userId] ?? [];

    const available = library.filter(
      (t) =>
        t.type === "global" || t.type === "system" || userPrefs.includes(t.id),
    );

    return sortCategoriesByType(available);
  } catch (err) {
    console.error("[Category API]:", err);
    return [];
  }
}
