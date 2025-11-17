// supabase/functions/places-api/index.ts

// Simple Supabase Edge Function (Deno) that reads from your production
// database via the PostgREST REST API. It is CORS-enabled and accepts
// GET (list) and POST (echo + list) requests.

const DEFAULT_SUPABASE_URL = "https://tdjlgzpktfuiuapqqubm.supabase.co";

function corsHeaders(origin?: string) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "*";

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders(origin) });
  }

  try {
    const SUPABASE_URL =
      Deno.env.get("VITE_SUPABASE_URL") || DEFAULT_SUPABASE_URL;
    const SUPABASE_ANON_KEY = Deno.env.get("VITE_SUPABASE_ANON_KEY") || "";

    // Support simple GET to list places or POST to echo plus list
    if (req.method === "GET") {
      const restUrl = `${SUPABASE_URL}/rest/v1/places?select=*&order=id.asc&limit=20`;

      const r = await fetch(restUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      const data = await r.json();

      return new Response(JSON.stringify({ data }), {
        status: r.ok ? 200 : r.status,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    // For POST: accept JSON body and optionally return first 10 places
    if (req.method === "POST") {
      type Body = { name?: string };
      let body: Body = {};
      try {
        body = (await req.json()) as Body;
      } catch (_e) {
        body = {};
      }

      const restUrl = `${SUPABASE_URL}/rest/v1/places?select=*&order=id.asc&limit=10`;
      const r = await fetch(restUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      const data = await r.json();

      return new Response(
        JSON.stringify({ message: `Hello ${body.name || "World"}!`, data }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders(origin),
          },
        },
      );
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  } catch (err) {
    console.error("places-api error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }
});
