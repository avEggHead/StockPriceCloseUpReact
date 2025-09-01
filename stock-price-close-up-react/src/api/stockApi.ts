const BASE = import.meta.env.VITE_API_BASE;

export async function searchSymbols(query: string) {
  const res = await fetch(`${BASE}/stocksapi/search?query=${encodeURIComponent(query)}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Search failed");
  return res.json() as Promise<{ symbol: string; description: string }[]>;
}

export async function getQuote(symbol: string) {
  const res = await fetch(`${BASE}/stocksapi/quote?symbol=${encodeURIComponent(symbol)}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Quote fetch failed");
  return res.json() as Promise<{
    current: number;
    open: number;
    high: number;
    low: number;
    previousClose: number;
    timestamp: number;
  }>;
}
