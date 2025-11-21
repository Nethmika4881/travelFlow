import { useState, useEffect, useCallback } from "react";

const SUPABASE_FUNCTION_URL =
  "https://tdjlgzpktfuiuapqqubm.supabase.co/functions/v1/get-profile-photo";

/**
 * Custom hook to securely generate the proxy URL for a Google Profile Photo URI.
 * @param {string | null | undefined} googlePhotoUri - The raw URI from the Google Places API
 * @returns {{ proxyUrl: string | null, isLoading: boolean, error: string | null }}
 */
export function useProfilePhotoProxy(googlePhotoUri) {
  const [proxyUrl, setProxyUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateProxyUrl = useCallback((uri) => {
    if (!uri) return null;

    // 1. Ensure the URI is URL-safe
    const encodedUri = encodeURIComponent(uri);

    // 2. Construct the final URL pointing to your deployed Edge Function
    return `${SUPABASE_FUNCTION_URL}?uri=${encodedUri}`;
  }, []);

  useEffect(() => {
    if (!googlePhotoUri) {
      setProxyUrl(null);
      // Reset loading/error state when input is null
      setIsLoading(false);
      setError(null);
      return;
    }

    // Since this process is instant (just generating a string),
    // we set loading state briefly and then immediately resolve.
    setIsLoading(true);
    setError(null);

    try {
      // Generate the proxy URL
      const generatedUrl = generateProxyUrl(googlePhotoUri);

      // Set the final URL. The browser's <img> tag will handle the fetch.
      setProxyUrl(generatedUrl);
    } catch (e) {
      // Catch any unexpected error during string generation
      setError("Error generating proxy URL.");
      setProxyUrl(null);
    } finally {
      // Loading is finished regardless of success or failure
      setIsLoading(false);
    }
  }, [googlePhotoUri, generateProxyUrl]);

  return { proxyUrl, isLoading, error };
}
