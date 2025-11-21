import { supabase } from "../../supabase";

// src/components/MyLiveFunctionTester.jsx

function Guide() {
  const callLiveFunction = async () => {
    console.log("Calling live function...");

    const { data, error } = await supabase.functions.invoke("places-api", {
      body: { place_id: "ChIJ73hL2y6I4zoRSXJ3U5GovM4" },
    });

    console.log(data, error);
  };

  return (
    <button
      onClick={callLiveFunction}
      className="rounded bg-green-500 p-2 text-white"
    >
      Call LIVE Function
    </button>
  );
}

export default Guide;
