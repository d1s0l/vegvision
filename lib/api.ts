export async function getUser() {
  const res = await fetch("/api/user", {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Ошибка запроса");
  }

  return res.json();
}