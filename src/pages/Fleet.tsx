import { useEffect, useState } from "react";

type Latest = {
  deviceId: string;
  ts: number;
  data: string; // JSON string from Dynamo
};

type Row = Latest;

const API = import.meta.env.VITE_API_URL as string; // from .env.production

export default function Fleet() {
  const [latest, setLatest] = useState<Latest | null>(null);
  const [series, setSeries] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      // 1) latest
      const r1 = await fetch(`${API}devices/test-001/latest`);
      if (!r1.ok) throw new Error(`latest http ${r1.status}`);
      const latestJson = (await r1.json()) as Latest;
      setLatest(latestJson);

      // 2) series (last 20)
      const r2 = await fetch(`${API}devices/test-001/series?limit=20`);
      if (!r2.ok) throw new Error(`series http ${r2.status}`);
      const seriesJson = (await r2.json()) as Row[];
      setSeries(seriesJson);
    } catch (e: any) {
      setError(e.message ?? String(e));
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 10_000); // refresh every 10s
    return () => clearInterval(id);
  }, []);

  const prettyLatest =
    latest ? JSON.stringify(JSON.parse(latest.data), null, 2) : "";

  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold mb-6">Fleet</h1>

      {error && (
        <div className="mb-4 rounded bg-red-100 text-red-800 p-3">
          Error: {error}
        </div>
      )}

      {!latest && !error && <p>Loading latest telemetry…</p>}

      {latest && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Latest (test-001)</h2>
          <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto">
            {prettyLatest}
          </pre>
        </div>
      )}

      {series.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Recent (20)</h2>
          <ul className="mt-2 list-disc pl-5">
            {series.map((row) => (
              <li key={`${row.deviceId}-${row.ts}`}>
                {row.deviceId} — {new Date(row.ts).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
