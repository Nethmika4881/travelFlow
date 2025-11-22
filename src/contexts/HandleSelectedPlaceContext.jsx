// // import useGetPlaces from "@/hooks/useGetPlaces";

// import { createContext, useContext, useState } from "react";
// import { useParams } from "react-router-dom";
// import { usePlacesList } from "./PlacesListContext";

// const SelectedPlaceContext = createContext();
// function SelectedPlaceProvider({ children }) {
//   const { destinationID } = useParams();
//   const { places, isLoading, isError, error } = usePlacesList();

//   console.log(destinationID, "ID");

//   const [selectedID, setSelectedID] = useState(destinationID || null);
//   const [selectedPlaceObject, setSelectedPlaceObject] = useState({});

//   const handleSelectedID = function (id) {
//     setSelectedID(id);
//   };

//   const handleSelectedPlaceObject = function (selectedID) {
//     if (!selectedID) return;

//     const obj = places.filter((place) => place.id === selectedID);
//     setSelectedPlaceObject(obj);
//   };
//   return (
//     <SelectedPlaceContext.Provider
//       value={{
//         error,
//         selectedID,
//         handleSelectedID,
//         isLoading,
//         isError,
//         handleSelectedPlaceObject,
//         selectedPlaceObject,
//       }}
//     >
//       {children}
//     </SelectedPlaceContext.Provider>
//   );
// }
// const useSelectedPlace = () => {
//   const context = useContext(SelectedPlaceContext);
//   if (!context)
//     throw new Error(
//       "Places context used outside of the area that we can access",
//     );
//   return context;
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export { useSelectedPlace, SelectedPlaceProvider };

import { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePlacesList } from "./PlacesListContext";

const SelectedPlaceContext = createContext(null);

function SelectedPlaceProvider({ children }) {
  const { destinationID } = useParams();
  const { places, isLoading, isError, error } = usePlacesList();

  const selectedID = destinationID ? Number(destinationID) : null;

  const selectedPlaceObject = useMemo(() => {
    if (!places || places.length === 0 || !selectedID) return null;
    return places.find((place) => place.id === selectedID) || null;
  }, [places, selectedID]);

  const value = useMemo(
    () => ({
      error,
      selectedID,
      isLoading,
      isError,
      selectedPlaceObject,
    }),
    [error, selectedID, isLoading, isError, selectedPlaceObject],
  );

  return (
    <SelectedPlaceContext.Provider value={value}>
      {children}
    </SelectedPlaceContext.Provider>
  );
}

const useSelectedPlace = () => {
  const context = useContext(SelectedPlaceContext);
  if (!context) {
    throw new Error(
      "useSelectedPlace must be used within SelectedPlaceProvider",
    );
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useSelectedPlace, SelectedPlaceProvider };
