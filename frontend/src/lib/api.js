const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export async function getFaq() {
  const res = await fetch(`${API_BASE}/faq`);
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}

export async function postChat(query, lang = "auto") {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  const data = await res.json();

  return {
    reply: data.answer || "",
    products: data.products || [],
    requires_product: data.requires_product || false
  };
}
