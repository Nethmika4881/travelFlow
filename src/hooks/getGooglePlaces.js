import { supabase } from "../../supabase";

async function getGooglePlaces(placeId) {
  try {
    const { data, error } = await supabase.functions.invoke("places-api", {
      body: {
        place_id: placeId,
      },
    });

    if (error) throw error;
    console.log("data", data);
    return data; // Returns the place object
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw error;
  }
}

export default getGooglePlaces;
