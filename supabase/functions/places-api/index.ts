import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// These are the all-important CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Or your production domain(s)
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE,  PATCH",
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

// serve(async (req) => {
//   // 1. Handle CORS preflight request
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   // Your actual function logic
//   try {
//     // ... your logic goes here ...
//     // Example: const body = await req.json();

//     const responseData = { message: "Success!" };

//     // 2. Use the 'json' helper for your success response
//     return json(200, responseData);
//   } catch (error) {
//     // 3. Use the 'json' helper for your error response
//     return json(400, { error: error });
//   }
// });

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   try {
//     const { place_id } = await req.json();

//     // Fetch from Google Places API
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${Deno.env.get("GOOGLE_PLACES_API_KEY")}`,
//     );

//     const data = await response.json();
//     return json(200, data);
//   } catch (error) {
//     return json(400, { error: error.message });
//   }
// });
// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   try {
//     const { place_id } = await req.json();

//     if (!place_id) {
//       return json(400, { error: "place_id is required" });
//     }

//     // Fetch from Google Places API
//     const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
//     const response = await fetch(
//       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`,
//     );

//     const data = await response.json();

//     // Return the full Google Places response
//     return json(200, data); // This will have data.result
//   } catch (error) {
//     return json(500, { error: error.message });
//   }
// });
serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the place_id from request body
    const { place_id } = await req.json();

    if (!place_id) {
      return json(400, { error: "place_id is required" });
    }

    // Get your Google API key from environment variables
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY");

    if (!GOOGLE_API_KEY) {
      return json(500, { error: "API key not configured" });
    }

    // ACTUALLY CALL GOOGLE PLACES API
    // const googleResponse = await fetch(
    //   `https://places.googleapis.com/v1/places/${place_id}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-Goog-Api-Key": GOOGLE_API_KEY,
    //       "X-Goog-FieldMask":
    //         "id,displayName,formattedAddress,location,rating,userRatingCount,priceLevel,websiteUri,nationalPhoneNumber,internationalPhoneNumber,regularOpeningHours,photos,types,editorialSummary,addressComponents,reviews",
    //     },
    //   },
    // );

    const googleResponse = await fetch(
      `https://places.googleapis.com/v1/places/${place_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "id,displayName,formattedAddress,location,rating,userRatingCount,priceLevel,websiteUri,nationalPhoneNumber,internationalPhoneNumber,regularOpeningHours,photos,types,editorialSummary,addressComponents,reviews",
        },
      },
    );
    // Return the REAL data from Google
    const data = await googleResponse.json();
    return json(200, data);
  } catch (error) {
    console.error("Error:", error);
    return json(500, { error: error });
  }
});
