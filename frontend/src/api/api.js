const API_BASE = "http://localhost:8000";

export async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

export async function createItem(endpoint, body) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function updateItem(endpoint, id, body) {
  const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function deleteItem(endpoint, id) {
  const res = await fetch(`${API_BASE}/${endpoint}/${id}`, { method: "DELETE" });
  return res.json();
}
