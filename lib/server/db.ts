
type Row = Record<string, unknown>;

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
  return { url: url.replace(/\/$/, ""), key };
}

async function request(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  const headers = new Headers(init.headers);
  headers.set("apikey", key);
  headers.set("Authorization", `Bearer ${key}`);
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${url}/rest/v1/${path}`, { ...init, headers, cache: "no-store" });
  if (!res.ok) throw new Error(`Database request failed (${res.status}): ${await res.text()}`);
  return res;
}

export async function insert(table: string, row: Row) {
  const res = await request(table, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(row) });
  const data = await res.json() as Row[];
  return data[0];
}

export async function update(table: string, filters: Record<string, string>, patch: Row) {
  const query = Object.entries(filters).map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`).join("&");
  const res = await request(`${table}?${query}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(patch) });
  return await res.json() as Row[];
}

export async function select(table: string, filters: Record<string, string>, limit = 1) {
  const query = Object.entries(filters).map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`).join("&");
  const res = await request(`${table}?select=*&${query}&limit=${limit}`);
  return await res.json() as Row[];
}
export async function uploadStorage(
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string
) {
  const { url, key } = config();

  const res = await fetch(
    `${url}/storage/v1/object/${bucket}/${path}`,
    {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": contentType,
        "x-upsert": "true",
      },
      body: new Uint8Array(file),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Storage upload failed (${res.status}): ${await res.text()}`
    );
  }

  return await res.json();
}