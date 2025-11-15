import { useQuery } from "@tanstack/react-query";
import getPlaces from "../services/apiPlaces";

function useGetPlaces() {
  const {
    data: places,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });

  return { places, error, isLoading, isError };
}

export default useGetPlaces;
