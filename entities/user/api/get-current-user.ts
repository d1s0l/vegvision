import type { User } from "../model/types";

export async function getCurrentUser() {
  const res = await fetch("/api/user", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Ошибка запроса");
  }

  return res.json() as Promise<User>;
}
