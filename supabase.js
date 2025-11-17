// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);

// export { supabase };

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This line reads VITE_FUNCTIONS_URL from .env.local
const functionsUrl = import.meta.env.VITE_FUNCTIONS_URL || supabaseUrl;

const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      "x-client-info": "supabase-js-web",
    },
    fetch: (url, options) => {
      // Redirects function calls to local server
      if (url.includes("/functions/v1/") && functionsUrl !== supabaseUrl) {
        url = url.replace(supabaseUrl, functionsUrl);
      }
      return fetch(url, options);
    },
  },
});

export { supabase };
