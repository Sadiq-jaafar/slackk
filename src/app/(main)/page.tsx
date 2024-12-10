// import { Button } from '@/components/ui/button'
// import React from 'react'

// const page = () => {
//   return (
//     <div>
//       <Button>Click M</Button>
//       <h1>Hello World</h1>
//     </div>
//   )
// }

// export default page
"use client";

import { useEffect, useState } from "react";
import { supabaseBrowserClient } from "@/supabase/supabaseClient";
import { User } from "@/types/app"; // Importing the User type from your types folder
import { redirect } from "next/navigation";

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabaseBrowserClient.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error.message);
          setUser(null);
        } else if (user) {
          setUser({
            avatar_url: user.user_metadata?.avatar_url || "",
            channel: user.user_metadata?.channel || null,
            created_at: user.created_at,
            email: user.email,
            id: user.id,
            is_away: false, // Assuming a default value, customize if needed
            name: user.user_metadata?.name || null,
            phone: user.phone || null,
            type: user.user_metadata?.type || null,
            workspaces: user.user_metadata?.workspaces || null,
          });
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);
  useEffect(() => {
    if (!loading) {
      // Ensure redirection only happens after loading is complete
      if (!user) {
        redirect("/auth"); // Redirect to /auth
      }
      const userWorkSpaceId = user?.workspaces?.[0];
      if (!userWorkSpaceId) {
        redirect("/create-workspace"); // Redirect to /create-workspace
      }
    }
  }, [user, loading]); // D

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.email}!</h1>
            <p>You are signed in successfully.</p>
            <p>Your ID: {user.id}</p>
          </div>
        ) : (
          <h1 className="text-2xl font-bold">Welcome to Slackk!</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;
