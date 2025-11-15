import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import MyTrips from "./pages/MyTrips";
import PagenotFoundError from "./pages/PagenotFoundError";
import Guiders from "./pages/Guiders";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },

      {
        path: "destinations",
        element: <Destinations />,
      },
      {
        path: "destinations/destination/:id",
        element: <DestinationDetails />,
      },
      {
        path: "mytrips",
        element: <MyTrips />,
      },

      {
        path: "guiders",
        element: <Guiders />,
      },
    ],
  },
  {
    path: "*",
    element: <PagenotFoundError />,
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
