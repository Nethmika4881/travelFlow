import { supabase } from "./../../supabase";
export const getSelectedObj = async function (destinationID) {
  const { data: place, error } = await supabase
    .from("places")
    .select("*")
    .eq("id", destinationID);
  // console.log(place, "placeplace");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return place[0];
};
