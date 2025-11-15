import toast from "react-hot-toast";
import { supabase } from "../../supabase";

const getPlaces = async function () {
  const { data: places, error } = await supabase.from("places").select("*");
  if (error) {
    toast.error("Error Occured!");
    console.error("Error Occured : ", error.message);
    return;
  }

  return places;
};

export default getPlaces;
