import React from "react";
import { supabase } from "../../supabase";

export default function Guide() {
  const callMyFunction = async () => {
    try {
      // Using supabase.functions.invoke as requested.
      // Local dev: make sure VITE_FUNCTIONS_URL points to http://127.0.0.1:54321
      const { data, error } = await supabase.functions.invoke("places-api", {
        body: { name: "React" },
      });

      if (error) {
        console.error("Function error:", error);
        alert(`Error: ${error.message || JSON.stringify(error)}`);
        return;
      }

      console.log("Function response:", data);
      alert(`Success: ${data?.message || "OK"}`);
    } catch (err) {
      console.error("Unexpected error invoking function:", err);
      alert(`Unexpected error: ${err?.message || err}`);
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
