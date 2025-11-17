import { useQuery } from "@tanstack/react-query";
import getPlace from "../services/apiPlace";

function useGetPlace(id) {
  const {
    data: place,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["place", id],
    queryFn: () => getPlace(id),
    enabled: !!id, //run if only id exists
  });

  return { place, error, isLoading, isError };
}

export default useGetPlace;
