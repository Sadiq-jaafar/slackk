"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseBrowserClient } from "@/supabase/supabaseClient";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      try {
        const { data, error } =
          await supabaseBrowserClient.auth.getSessionFromUrl();

        if (error) {
          console.error("Error during authentication callback:", error.message);
          return;
        }

        // Log the session if needed
        console.log("Authentication successful. Session:", data);

        // Redirect to the home page
        router.push("/");
      } catch (error) {
        console.error("Unexpected error during callback handling:", error);
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">
        Processing authentication... Redirecting shortly.
      </p>
    </div>
  );
};

export default AuthCallback;
