import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// These are the all-important CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // IMPORTANT: Allows access from your frontend domain
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Credentials": "true",
};

/**
 * Helper function to return a JSON response with CORS headers.
 */
function json(status: number, data: any) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json; charset=utf-8");
  for (const [k, v] of Object.entries(corsHeaders)) {
    headers.set(k, v);
  }
  return new Response(JSON.stringify(data), {
    headers,
    status: status,
  });
}

serve(async (req) => {
  // 1. Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the URL parameters from the request
    const url = new URL(req.url); // We expect the client to pass the reviewer's photoUri in a query parameter named 'uri'
    const photoUri = url.searchParams.get("uri");

    if (!photoUri) {
      return json(400, { error: "Review photo 'uri' parameter is required." });
    } // 2. Perform the server-side fetch to Google

    const googleResponse = await fetch(photoUri);

    if (!googleResponse.ok) {
      // Handle any non-200 responses from Google
      return json(502, {
        error: `Failed to fetch image from Google: Status ${googleResponse.status}`,
      });
    } // 3. Prepare final headers for the image response

    const finalHeaders = new Headers(); // Add CORS headers for the browser
    for (const [k, v] of Object.entries(corsHeaders)) {
      finalHeaders.set(k, v);
    } // Forward the correct Content-Type (e.g., image/jpeg) from Google
    finalHeaders.set(
      "Content-Type",
      googleResponse.headers.get("Content-Type") || "application/octet-stream",
    ); // Optional: Add caching headers for performance
    finalHeaders.set("Cache-Control", "public, max-age=604800, immutable"); // 4. Return the image data (body) directly to the client

    return new Response(googleResponse.body, {
      status: 200,
      headers: finalHeaders,
    });
  } catch (error) {
    console.error("Error:", error);
    return json(500, {
      error: (error as Error).message || "Internal server error",
    });
  }
});
