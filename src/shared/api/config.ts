export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const API_ROUTES = {
  user_category: "/user_category",
  shorts: "/shorts",
  subscriptions: "/subscriptions",
  meta: "/meta",
  videos: "/videos",
  notifications: "/notifications",
} as const;
