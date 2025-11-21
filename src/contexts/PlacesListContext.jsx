import useGetPlaces from "@/hooks/useGetPlaces";
import { createContext, useContext } from "react";

const PlacesContext = createContext();
function PlacesListProvider({ children }) {
  const { places, isLoading, isError } = useGetPlaces();
  // console.log(places, "places");
  return (
    <PlacesContext.Provider value={{ places, isLoading, isError }}>
      {children}
    </PlacesContext.Provider>
  );
}
const usePlacesList = () => {
  const context = useContext(PlacesContext);
  if (!context)
    throw new Error(
      "Places context used outside of the area that we can access",
    );
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { usePlacesList, PlacesListProvider };
