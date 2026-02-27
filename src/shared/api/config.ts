export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const API_ROUTES = {
  user_category: "/user_category",
  shorts: "/shorts",
  subscriptions: "/subscriptions",
  meta: "/meta",
  videos: "/videos",
  notifications: "/notifications",
  search_history: "/search_history",
} as const;
