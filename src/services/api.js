// central place to call backend
const API_BASE = "http://localhost:8000"; // change if needed

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json(); // { token, role, userId }
}
