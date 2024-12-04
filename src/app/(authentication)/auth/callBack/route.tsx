"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseBrowserClient } from "@/supabase/supabaseClient";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    async function handleAuthCallback() {
      const { data, error } =
        await supabaseBrowserClient.auth.getSessionFromUrl();

      if (error) {
        console.error("Error during callback:", error.message);
      } else if (data?.session) {
        console.log("Session received:", data.session);
      }

      // Redirect to home page after handling the callback
      router.push("/");
    }

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Processing authentication... Please wait.</p>
    </div>
  );
};

export default CallbackPage;
