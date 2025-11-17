import toast from "react-hot-toast";
import { supabase } from "../../supabase";

const getPlaceById = async function (id) {
  const { data: place, error } = await supabase
    .from("places")
    .select("*")
    .eq("id", id) // filter by id
    .single(); // return only one row

  if (error) {
    toast.error("Error Occured!");
    console.error("Error Occured : ", error.message);
    return null;
  }

  return place;
};

export default getPlaceById;
