const BASE = import.meta.env.VITE_API_BASE;

export async function register(username: string, password: string) {
  const res = await fetch(`${BASE}/accountapi/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 👈 ensures cookies flow
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE}/accountapi/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function logout() {
  const res = await fetch(`${BASE}/accountapi/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${BASE}/accountapi/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
}
