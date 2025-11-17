// src/components/MyComponent.jsx
// This is already JavaScript (JSX) and ready to use!

import { supabase } from "./../../supabase"; // Make sure you import your client

// function Guide() {
//   const callMyFunction = async () => {
//     console.log("Calling function...");
//     const { data, error } = await supabase.functions.invoke("places-api", {
//       body: { name: "React" }, // This 'name' is sent to the function
//     });

//     if (error) {
//       console.error("Error from function:", error);
//     } else {
//       console.log("Data from function:", data); // Will log: { messimport { supabase } from "../supabase";

export default function Guide() {
  const callMyFunction = async () => {
    console.log("Calling function...");

    try {
      const { data, error } = await supabase.functions.invoke("places-api", {
        body: { name: "React" },
      });
      console.log(data, "Data");
      if (error) {
        console.error("Error from function:", error);
        alert(`Error: ${error.message}`);
      } else {
        console.log("Data from function:", data);
        alert(`Success: ${data.message}`);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert(`Unexpected error: ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={callMyFunction}
        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Call Edge Function
      </button>
    </div>
  );
}
