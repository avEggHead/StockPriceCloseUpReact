import { useState } from "react";
import { searchSymbols, getQuote } from "../api/stockApi";

type Quote = {
  current: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  timestamp: number;
};

export default function StockLookup() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ symbol: string; description: string }[]>([]);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [error, setError] = useState("");

  async function handleSearchChange(value: string) {
    setQuery(value);
    setError("");
    setSelected(null);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const results = await searchSymbols(value);
      setSuggestions(results);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  }

  async function handleSelect(symbol: string) {
    setQuery(symbol);
    setSuggestions([]);
    try {
      const q = await getQuote(symbol);
      setSelected(q);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm p-4">
          <h2 className="mb-3">Stock Lookup</h2>

          {/* Lookup form with input + button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query) handleSelect(query);
            }}
            className="d-flex mb-2"
          >
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter symbol or company name"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Lookup
            </button>
          </form>

          {suggestions.length > 0 && (
            <ul className="list-group mb-3">
              {suggestions.map((s) => (
                <li
                  key={s.symbol}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelect(s.symbol)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{s.symbol}</strong> — {s.description}
                </li>
              ))}
            </ul>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          {selected && (
            <div className="card p-3 mt-3">
              <h4>
                {query} — ${selected.current.toFixed(2)}{" "}
                <span
                  style={{
                    color: selected.current >= selected.previousClose ? "green" : "red",
                  }}
                >
                  {selected.current >= selected.previousClose ? "▲" : "▼"}{" "}
                  {(
                    ((selected.current - selected.previousClose) / selected.previousClose) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </h4>
              <ul className="list-unstyled">
                <li>Open: ${selected.open.toFixed(2)}</li>
                <li>High: ${selected.high.toFixed(2)}</li>
                <li>Low: ${selected.low.toFixed(2)}</li>
                <li>Previous Close: ${selected.previousClose.toFixed(2)}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
