"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsSlack } from "react-icons/bs";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { supabaseBrowserClient } from "@/supabase/supabaseClient";
import { useRouter } from "next/navigation"; // Updated import for app directory

const AuthPage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter(); // Correct useRouter import

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const {
          data: { session },
        } = await supabaseBrowserClient.auth.getSession();

        if (session) {
          router.push("/"); // Use router.push from next/navigation
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    getCurrentUser();
    setIsMounted(true);
  }, [router]);

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Provide a valid email" })
      .min(2, { message: "Email must be at least 2 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle email registration logic
  }

  async function socialAuth(provider: "google" | "github") {
    setIsAuthenticating(true);
    try {
      await supabaseBrowserClient.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Error during social authentication:", error);
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (!isMounted) return null;

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography text="Slackk" variant="h1" />
        </div>
        <Typography
          text="Sign into your Slackk"
          variant="h2"
          className="mb-3"
        />
        <Typography
          text="Enter your Email and Password"
          variant="p"
          className="opacity-19 mb-7"
        />
        <div className="flex flex-col space-y-4">
          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-6 border-2 flex space-x-3"
            onClick={() => socialAuth("google")}
          >
            <FcGoogle />
            <Typography
              text="Continue With Google"
              variant="p"
              className=" text-xl"
            />
          </Button>
          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-6 border-2 flex space-x-3"
            onClick={() => socialAuth("github")}
          >
            <RxGithubLogo />
            <Typography
              text="Sign In With GitHub"
              variant="p"
              className=" text-xl"
            />
          </Button>
        </div>
        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography text="OR" variant="p" />
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticating}>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="yourEmail@Email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="secondary"
                  className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
                  type="submit"
                >
                  <Typography text="Sign in with Email" variant="p" />
                </Button>
                <div className="px-5 py-4 bg-gray-100 rounded-sm">
                  <div className="text-gray-500 flex items-center space-x-3 ">
                    <MdOutlineAutoAwesome />
                    <Typography
                      text="We will email you a link for password-free sign-in"
                      variant="p"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

// "use client";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
// import Typography from "@/components/ui/typography";
// import React, { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { BsSlack } from "react-icons/bs";
// import { MdOutlineAutoAwesome } from "react-icons/md";
// import { FcGoogle } from "react-icons/fc";
// import { RxGithubLogo } from "react-icons/rx";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Input } from "@/components/ui/input";
// import { log } from "node:console";
// import { Provider } from "@supabase/supabase-js";
// import { supabaseBrowserClient } from "@/supabase/supabaseClient";
// import { registerWithEmail } from "@/actions/register-with-email";
// import { useRouter } from "next/router";

// const Authpage = () => {
//   const [isAuthenticating, setIsAuthenticating] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const getCurrentUser = async () => {
//       try {
//         const {
//           data: { session },
//         } = await supabaseBrowserClient.auth.getSession();

//         if (session) {
//           router.push("/");
//         }
//       } catch (error) {
//         console.error("Error fetching session:", error);
//       }
//     };

//     getCurrentUser();
//     setIsMounted(true);
//   }, [router]);

//   const formSchema = z.object({
//     email: z
//       .string()
//       .email({ message: "Provide Valid email" })
//       .min(2, { message: "Email must be 2 characters" }),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//     // setIsAuthenticating(true);
//     // const response = await registerWithEmail(values);
//     // const { data, error } = JSON.parse(response);
//     // setIsAuthenticating(false);
//     // if (error) {
//     //   console.warn("Sign in Error", error);
//     //   return;
//     // }
//   }

//   async function socialAuth(provider: "google" | "github") {
//     setIsAuthenticating(true);
//     try {
//       await supabaseBrowserClient.auth.signInWithOAuth({
//         provider,
//         options: {
//           redirectTo: "http://localhost:3000", // `${location.origin}/auth/callback`/Redirect to callback page
//         },
//       });
//     } catch (error) {
//       console.error("Error during social authentication:", error);
//     } finally {
//       setIsAuthenticating(false);
//     }
//   }
//   if (!isMounted) return null;
//   return (
//     <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
//       <div className="max-w-[450px]">
//         <div className="flex justify-center items-center gap-3 mb-4">
//           <BsSlack size={30} />
//           <Typography text="Slackk" variant="h1" />
//         </div>
//         <Typography
//           text="Sign into your Slackk"
//           variant="h2"
//           className="mb-3"
//         />
//         <Typography
//           text="Enter your Email and Password"
//           variant="p"
//           className="opacity-19 mb-7"
//         />
//         <div className="flex flex-col space-y-4">
//           <Button
//             disabled={isAuthenticating}
//             variant="outline"
//             className="py-6 border-2 flex space-x-3"
//             onClick={() => socialAuth("google")}
//           >
//             <FcGoogle />
//             <Typography
//               text="Continue With Google"
//               variant="p"
//               className=" text-xl"
//             />
//           </Button>
//           <Button
//             disabled={isAuthenticating}
//             variant="outline"
//             className="py-6 border-2 flex space-x-3"
//             onClick={() => socialAuth("github")}
//           >
//             <RxGithubLogo />
//             <Typography
//               text="Sign In With GitHub"
//               variant="p"
//               className=" text-xl"
//             />
//           </Button>
//         </div>
//         <div>
//           <div className="flex items-center my-6">
//             <div className="mr-[10px] flex-1 border-t bg-neutral-300" />

//             <Typography text="OR" variant="p"></Typography>
//             <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
//           </div>
//           {/* form */}
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               <fieldset disabled={isAuthenticating}>
//                 <Controller
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input placeholder="yourEmail@Email.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button
//                   variant="secondary"
//                   className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
//                   type="submit"
//                 >
//                   <Typography text="Sign in with Email" variant="p" />
//                 </Button>
//                 <div className="px-5 py-4 bg-gray-100 rounded-sm">
//                   <div className="text-gray-500 flex items-center space-x-3 ">
//                     <MdOutlineAutoAwesome />
//                     <Typography
//                       text="We will email you a link for password free sign-in"
//                       variant="p"
//                     />
//                   </div>
//                 </div>
//               </fieldset>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Authpage;
// // function zodResolver(
// //   formSchema: z.ZodObject<
// //     { email: z.ZodString },
// //     "strip",
// //     z.ZodTypeAny,
// //     { email: string },
// //     { email: string }
// //   >
// // ): import("react-hook-form").Resolver<{ email: string }, any> | undefined {
// //   throw new Error("Function not implemented.");
// // }
