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

const HomePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabaseBrowserClient.auth.getUser();
      setUser(user);
    }

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.email}!</h1>
            <p>You are signed in successfully.</p>
          </div>
        ) : (
          <h1 className="text-2xl font-bold">Welcome to Slackk!</h1>
        )}
      </div>
    </div>
  );
};

export default HomePage;
